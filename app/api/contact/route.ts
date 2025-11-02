import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${validatedData.recaptchaToken}`,
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
    const companyEmail = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      subject: `New Contact Form Submission: ${validatedData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0078D7 0%, #0056a3 100%); padding: 30px; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>

          <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #333; font-size: 20px; margin-top: 0;">Contact Details</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Name:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    ${validatedData.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Email:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <a href="mailto:${validatedData.email}" style="color: #0078D7;">
                      ${validatedData.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666;">Phone:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <a href="tel:${validatedData.phone}" style="color: #0078D7;">
                      ${validatedData.phone}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #666;">Subject:</strong>
                  </td>
                  <td style="padding: 10px 0;">
                    ${validatedData.subject}
                  </td>
                </tr>
              </table>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; font-size: 18px; margin-top: 0;">Message</h3>
              <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">
                ${validatedData.message}
              </p>
            </div>

            <div style="margin-top: 20px; padding: 15px; background: #e8f4fd; border-left: 4px solid #0078D7; border-radius: 4px;">
              <p style="margin: 0; color: #666; font-size: 14px;">
                <strong>Quick Actions:</strong><br>
                • Reply to: <a href="mailto:${validatedData.email}" style="color: #0078D7;">${validatedData.email}</a><br>
                • Call: <a href="tel:${validatedData.phone}" style="color: #0078D7;">${validatedData.phone}</a>
              </p>
            </div>
          </div>
        </div>
      `,
    });

    // Send confirmation email to user
    const userEmail = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: validatedData.email,
      subject: "Thank you for contacting MSADDI.EST",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #0078D7 0%, #0056a3 100%); padding: 40px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Contacting Us!</h1>
          </div>

          <div style="background: #f5f5f5; padding: 40px; border-radius: 0 0 10px 10px;">
            <div style="background: white; padding: 30px; border-radius: 8px;">
              <p style="color: #333; font-size: 16px; line-height: 1.6;">
                Dear ${validatedData.name},
              </p>

              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Thank you for reaching out to MSADDI.EST. We have received your message and appreciate your interest in our metal fabrication services.
              </p>

              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                Our team will review your inquiry and get back to you within 24 hours.
              </p>

              <div style="background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <h3 style="color: #333; margin-top: 0;">Your Message Summary:</h3>
                <p style="color: #666; margin: 5px 0;"><strong>Subject:</strong> ${validatedData.subject}</p>
                <p style="color: #666; margin: 5px 0;"><strong>Message:</strong></p>
                <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">
                  ${validatedData.message}
                </p>
              </div>

              <p style="color: #666; font-size: 16px; line-height: 1.6;">
                In the meantime, feel free to:
              </p>

              <ul style="color: #666; font-size: 16px; line-height: 1.8;">
                <li>Visit our website: <a href="https://www.msaddi.com" style="color: #0078D7;">www.msaddi.com</a></li>
                <li>Call us directly: <a href="tel:+963944244604" style="color: #0078D7;">+963 944 244 604</a></li>
                <li>WhatsApp us: <a href="https://wa.me/963944244604" style="color: #0078D7;">+963 944 244 604</a></li>
              </ul>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 14px; margin: 0;">
                  Best regards,<br>
                  <strong>The MSADDI.EST Team</strong><br>
                  Sheet Metal Fabrication Experts
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}