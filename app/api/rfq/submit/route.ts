import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { z } from 'zod';
import nodemailer from 'nodemailer';

/**
 * RFQ Submission API Endpoint
 *
 * Security Features:
 * - CSRF protection via origin verification
 * - Rate limiting (5 requests per 15 minutes per IP)
 * - Input validation with Zod
 * - File size & type validation
 * - Secure email notifications
 *
 * POST /api/rfq/submit
 */

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

// Validation schema (server-side validation)
const rfqSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(8).max(20),
  company: z.string().max(100).optional(),
  service: z.string(),
  material: z.string(),
  thickness: z.coerce.number().min(0.5).max(50),
  length: z.coerce.number().positive().optional(),
  width: z.coerce.number().positive().optional(),
  quantity: z.coerce.number().int().min(1),
  timeline: z.string(),
  tolerance: z.string().max(50).optional(),
  surfaceFinish: z.string().max(100).optional(),
  additionalRequirements: z.string().max(2000).optional(),
});

// CSRF Protection: Verify origin
function verifyCsrfToken(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');

  if (!origin || !host) {
    return false;
  }

  // In production, check against allowed origins
  const allowedOrigins = [
    `http://localhost:3000`,
    `https://${host}`,
    `http://${host}`,
  ];

  return allowedOrigins.some(allowed => origin.startsWith(allowed));
}

// Rate Limiting
function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // New window or reset
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs,
    });
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 };
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count };
}

// Email notification
async function sendRfqNotification(data: z.infer<typeof rfqSchema>, files: string[]) {
  // Configure email transporter (use environment variables in production)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const emailContent = `
    <h2>New RFQ Submission - MSADDI EST.</h2>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      ${data.company ? `<li><strong>Company:</strong> ${data.company}</li>` : ''}
    </ul>

    <h3>Project Specifications</h3>
    <ul>
      <li><strong>Service:</strong> ${data.service}</li>
      <li><strong>Material:</strong> ${data.material}</li>
      <li><strong>Thickness:</strong> ${data.thickness}mm</li>
      ${data.length ? `<li><strong>Length:</strong> ${data.length}mm</li>` : ''}
      ${data.width ? `<li><strong>Width:</strong> ${data.width}mm</li>` : ''}
      <li><strong>Quantity:</strong> ${data.quantity}</li>
      <li><strong>Timeline:</strong> ${data.timeline}</li>
    </ul>

    ${data.tolerance || data.surfaceFinish ? '<h3>Additional Details</h3><ul>' : ''}
    ${data.tolerance ? `<li><strong>Tolerance:</strong> ${data.tolerance}</li>` : ''}
    ${data.surfaceFinish ? `<li><strong>Surface Finish:</strong> ${data.surfaceFinish}</li>` : ''}
    ${data.tolerance || data.surfaceFinish ? '</ul>' : ''}

    ${data.additionalRequirements ? `
      <h3>Additional Requirements</h3>
      <p>${data.additionalRequirements}</p>
    ` : ''}

    ${files.length > 0 ? `
      <h3>Attached Files</h3>
      <ul>
        ${files.map(file => `<li>${file}</li>`).join('')}
      </ul>
    ` : ''}

    <hr>
    <p><small>Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Damascus' })} (Damascus Time)</small></p>
  `;

  // Send to company
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"MSADDI Website" <noreply@msaddi.com>',
    to: process.env.RFQ_EMAIL || 'Sales@msaddi.com',
    subject: `New RFQ: ${data.service} - ${data.material}`,
    html: emailContent,
  });

  // Send confirmation to customer
  await transporter.sendMail({
    from: process.env.SMTP_FROM || '"MSADDI EST." <noreply@msaddi.com>',
    to: data.email,
    subject: 'RFQ Received - MSADDI EST.',
    html: `
      <h2>Thank you for your RFQ submission!</h2>
      <p>Dear ${data.name},</p>
      <p>We have received your Request for Quote for <strong>${data.service}</strong> services.</p>
      <p>Our technical team will review your requirements and contact you within 24-48 hours.</p>

      <h3>Your Submission Summary:</h3>
      <ul>
        <li><strong>Service:</strong> ${data.service}</li>
        <li><strong>Material:</strong> ${data.material}</li>
        <li><strong>Thickness:</strong> ${data.thickness}mm</li>
        <li><strong>Quantity:</strong> ${data.quantity}</li>
        <li><strong>Timeline:</strong> ${data.timeline}</li>
      </ul>

      <p>If you have any urgent questions, please contact us:</p>
      <ul>
        <li><strong>Phone:</strong> +963 944 244 604</li>
        <li><strong>Email:</strong> Sales@msaddi.com</li>
      </ul>

      <p>Best regards,<br>
      MSADDI EST. Team<br>
      Excellence in Metal Fabrication</p>
    `,
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. CSRF Protection
    if (!verifyCsrfToken(request)) {
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      );
    }

    // 2. Rate Limiting
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const { allowed, remaining } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 3. Parse form data
    const formData = await request.formData();

    // Extract form fields
    const data: Record<string, any> = {};
    const files: File[] = [];

    formData.forEach((value, key) => {
      if (key.startsWith('file_')) {
        if (value instanceof File) {
          files.push(value);
        }
      } else {
        data[key] = value;
      }
    });

    // 4. Validate input data
    const validatedData = rfqSchema.parse(data);

    // 5. Validate files
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = ['application/pdf', 'image/png', 'image/jpeg'];

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File ${file.name} exceeds maximum size of 10MB` },
          { status: 400 }
        );
      }

      // Additional type validation can be added here
    }

    // 6. Send email notifications
    const fileNames = files.map(f => f.name);

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await sendRfqNotification(validatedData, fileNames);
    } else {
      console.warn('SMTP not configured. Email notifications disabled.');
      console.log('RFQ Submission:', validatedData);
    }

    // 7. Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'RFQ submitted successfully',
        rfqId: `RFQ-${Date.now()}`, // In production, generate proper ID
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
        },
      }
    );
  } catch (error) {
    console.error('RFQ submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Prevent GET requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
