import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import he from "he";
import { env } from "@/lib/env";
import { getUserConfirmationEmail, getCompanyNotificationEmail, type EmailLocale } from "@/lib/email-templates";
import { rateLimitContactForm } from "@/lib/rate-limiter";
import { validateFile } from "@/lib/file-validator";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(20),
  recaptchaToken: z.string(),
  locale: z.enum(['en', 'ar', 'tr', 'fr', 'de', 'es', 'it', 'pt', 'nl']).optional().default('en'),
});

export async function POST(request: NextRequest) {
  try {
    // Check if required environment variables are set
    if (!env.RESEND_API_KEY || !env.RECAPTCHA_SECRET_KEY || !env.EMAIL_FROM || !env.EMAIL_TO) {
      console.error('Missing required environment variables for contact form');
      return NextResponse.json(
        { error: "Contact form is temporarily unavailable. Please email us directly at info@msaddi.com or call +963 944 244 604" },
        { status: 503 }
      );
    }

    // Initialize Resend with API key
    const resend = new Resend(env.RESEND_API_KEY);

    // ⚡ Distributed Rate Limiting: Prevent spam across multiple servers
    // Uses Vercel KV (Redis) for persistence and scalability
    // ⚠️ NOTE: Rate limiting is optional - if KV is not configured, requests are allowed
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const rateLimitResult = await rateLimitContactForm(ip);

    // Only block if rate limit is explicitly exceeded (not if KV is unavailable)
    if (!rateLimitResult.success && rateLimitResult.error === "Rate limit exceeded") {
      // Log rate limit violation for monitoring
      console.warn(`Rate limit exceeded for IP: ${ip}`);

      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: rateLimitResult.reset
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.reset),
            'X-RateLimit-Limit': '3',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Math.floor(Date.now() / 1000) + rateLimitResult.reset),
          }
        }
      );
    }

    // Log rate limiter status for debugging
    if (rateLimitResult.error && rateLimitResult.error !== "Rate limit exceeded") {
      // eslint-disable-next-line no-console
      console.log(`Rate limiter status: ${rateLimitResult.error}`);
    }

    // Parse FormData instead of JSON to support file uploads
    const formData = await request.formData();

    // Extract form fields
    const body = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      recaptchaToken: formData.get('recaptchaToken') as string,
      locale: (formData.get('locale') as string) || 'en',
    };

    // Extract file if present
    const attachmentFile = formData.get('attachment') as File | null;

    // 🔒 SECURITY: Validate file using Magic Byte detection
    // This prevents malicious files disguised with safe extensions
    if (attachmentFile && attachmentFile.size > 0) {
      const fileValidation = await validateFile(attachmentFile);

      if (!fileValidation.valid) {
        console.warn(`File validation failed for ${attachmentFile.name}: ${fileValidation.error}`);
        return NextResponse.json(
          {
            error: fileValidation.error || "Invalid file",
            details: {
              filename: attachmentFile.name,
              size: attachmentFile.size,
            },
          },
          { status: 400 }
        );
      }

      // Log successful file validation
      // eslint-disable-next-line no-console
      console.log(`File validated: ${attachmentFile.name} (${fileValidation.mimeType}, ${fileValidation.size} bytes)`);
    }

    // Validate input
    let validatedData;
    try {
      validatedData = contactSchema.parse(body);
    } catch (zodError) {
      if (zodError instanceof z.ZodError) {
        console.error('Contact form validation error:', {
          errors: zodError.errors,
          body: { ...body, recaptchaToken: '***' } // Hide token in logs
        });
      }
      throw zodError;
    }

    // Verify reCAPTCHA
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${env.RECAPTCHA_SECRET_KEY}&response=${validatedData.recaptchaToken}`,
      }
    );

    // Check if Google reCAPTCHA service responded successfully
    if (!recaptchaResponse.ok) {
      console.error('reCAPTCHA service error:', recaptchaResponse.status, recaptchaResponse.statusText);
      return NextResponse.json(
        { error: "reCAPTCHA service unavailable. Please try again later." },
        { status: 502 }
      );
    }

    const recaptchaData = await recaptchaResponse.json();

    // Enhanced reCAPTCHA debugging
    // eslint-disable-next-line no-console
    console.log('reCAPTCHA verification result:', {
      success: recaptchaData.success,
      score: recaptchaData.score,
      action: recaptchaData.action,
      challenge_ts: recaptchaData.challenge_ts,
      hostname: recaptchaData.hostname,
      'error-codes': recaptchaData['error-codes']
    });

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.warn('reCAPTCHA verification failed:', {
        success: recaptchaData.success,
        score: recaptchaData.score,
        errorCodes: recaptchaData['error-codes'],
        reason: !recaptchaData.success ? 'Verification failed' : `Score too low: ${recaptchaData.score}`
      });

      return NextResponse.json(
        {
          error: "reCAPTCHA verification failed",
          details: process.env.NODE_ENV === 'development' ? {
            success: recaptchaData.success,
            score: recaptchaData.score,
            errorCodes: recaptchaData['error-codes']
          } : undefined
        },
        { status: 400 }
      );
    }

    // Sanitize user inputs to prevent XSS attacks in emails
    const safeName = he.encode(validatedData.name);
    const safeEmail = he.encode(validatedData.email);
    const safePhone = he.encode(validatedData.phone);
    const safeSubject = he.encode(validatedData.subject);
    const safeMessage = he.encode(validatedData.message);

    // Process attachment if present
    let attachments: Array<{ filename: string; content: Buffer }> = [];
    if (attachmentFile && attachmentFile.size > 0) {
      const arrayBuffer = await attachmentFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      attachments = [{
        filename: attachmentFile.name,
        content: buffer,
      }];
    }

    // Generate company notification email using template
    // Map locale to supported email template language (en, ar, tr)
    // For languages without email templates (fr, de, es, it, pt, nl), fallback to English
    const emailLocale: EmailLocale = ['en', 'ar', 'tr'].includes(validatedData.locale)
      ? validatedData.locale as EmailLocale
      : 'en';

    const companyEmail = getCompanyNotificationEmail({
      name: safeName,
      email: safeEmail,
      phone: safePhone,
      subject: safeSubject,
      message: safeMessage,
      locale: emailLocale
    });

    // Send email to company with attachment
    const companyEmailResult = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject: companyEmail.subject,
      html: companyEmail.html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Check if company email was sent successfully
    if (companyEmailResult.error) {
      console.error('Failed to send company email:', companyEmailResult.error);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 500 }
      );
    }

    // Generate user confirmation email using template with user's language
    // Uses emailLocale (mapped to en/ar/tr) from above
    const userEmail = getUserConfirmationEmail(
      emailLocale,
      {
        name: safeName,
        email: safeEmail,
        phone: safePhone,
        subject: safeSubject,
        message: safeMessage,
      }
    );

    // Send confirmation email to user with attachment
    const userEmailResult = await resend.emails.send({
      from: env.EMAIL_FROM,
      to: validatedData.email,
      subject: userEmail.subject,
      html: userEmail.html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Log if user confirmation email failed (but don't block the request since main email succeeded)
    if (userEmailResult.error) {
      console.error('Failed to send user confirmation email:', userEmailResult.error);
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!"
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      // Log detailed validation errors for debugging
      console.error('Form validation failed:', error.errors);

      return NextResponse.json(
        {
          error: "Invalid form data",
          details: error.errors,
          // Provide user-friendly error message
          message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}