import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";
import { env } from "@/lib/env";

// Initialize Resend with API key from centralized environment variables
const resend = new Resend(env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(3),
  message: z.string().min(20),
  recaptchaToken: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

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

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    // Send email to company
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>

          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${validatedData.name}</p>
            <p><strong>Email:</strong> ${validatedData.email}</p>
            <p><strong>Phone:</strong> ${validatedData.phone}</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
          </div>

          <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h3 style="color: #0066cc; margin-top: 0;">Message</h3>
            <p style="line-height: 1.6; color: #333;">${validatedData.message}</p>
          </div>

          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
            <p>This message was sent from the contact form on msaddi.com</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: env.EMAIL_FROM,
      to: validatedData.email,
      subject: "Thank you for contacting MSADDI.EST",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0066cc 0%, #004499 100%); padding: 40px 20px; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; text-align: center;">MSADDI.EST</h1>
            <p style="color: white; text-align: center; margin: 10px 0 0 0;">Metal Fabrication Excellence</p>
          </div>

          <div style="padding: 40px 20px; background-color: #ffffff;">
            <h2 style="color: #333; margin-top: 0;">Thank You for Contacting Us!</h2>

            <p style="color: #666; line-height: 1.6;">
              Dear ${validatedData.name},
            </p>

            <p style="color: #666; line-height: 1.6;">
              We have received your inquiry and appreciate your interest in MSADDI.EST's metal fabrication services.
              Our team will review your message and get back to you within 24 hours.
            </p>

            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #0066cc; margin-top: 0;">Your Message Details:</h3>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <p><strong>Message:</strong></p>
              <p style="color: #666; line-height: 1.6;">${validatedData.message}</p>
            </div>

            <div style="background-color: #e8f4f8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
              <h3 style="color: #0066cc; margin-top: 0;">What Happens Next?</h3>
              <ul style="color: #666; line-height: 1.8;">
                <li>Our technical team will review your requirements</li>
                <li>We'll prepare a detailed quote based on your specifications</li>
                <li>A specialist will contact you to discuss your project</li>
              </ul>
            </div>

            <p style="color: #666; line-height: 1.6;">
              If you have any urgent requirements, please feel free to call us directly at:
              <br><strong>+963 944 244 604</strong>
            </p>

            <p style="color: #666; line-height: 1.6;">
              Best regards,<br>
              <strong>MSADDI.EST Team</strong>
            </p>
          </div>

          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p>© 2024 MSADDI.EST - Leading Metal Fabrication in Syria</p>
            <p>Aleppo, Syria | info@msaddi.com | www.msaddi.com</p>
          </div>
        </div>
      `,
    });

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