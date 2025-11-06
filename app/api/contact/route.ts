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
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
               request.headers.get('x-real-ip') ||
               'unknown';

    const rateLimitResult = await rateLimitContactForm(ip);

    if (!rateLimitResult.success) {
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
    const validatedData = contactSchema.parse(body);

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

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
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
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}