import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limiting: 5 requests per 15 minutes per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(ip: string): string {
  return `rate_limit:${ip}`;
}

function checkRateLimit(ip: string): boolean {
  const key = getRateLimitKey(ip);
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(key);

  if (!rateLimitData || now > rateLimitData.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (rateLimitData.count >= RATE_LIMIT) {
    return false;
  }

  rateLimitData.count++;
  return true;
}

// Input validation schema - prevents XSS, SQL injection, etc.
const contactSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .trim()
    .transform((val) => val.replace(/[<>]/g, '')), // Remove potential XSS characters
  email: z.string().email().trim().toLowerCase(),
  phone: z
    .string()
    .min(10)
    .max(20)
    .trim()
    .transform((val) => val.replace(/[^\d\s\+\-()]/g, '')), // Only allow phone number characters
  subject: z
    .string()
    .min(3)
    .max(200)
    .trim()
    .transform((val) => val.replace(/[<>]/g, '')),
  message: z
    .string()
    .min(10)
    .max(1000)
    .trim()
    .transform((val) => val.replace(/[<>]/g, '')),
});

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': '900', // 15 minutes in seconds
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user

    // For now, we'll just log it (in production, remove this)
    console.log('Contact form submission:', {
      ...validatedData,
      ip,
      timestamp: new Date().toISOString(),
    });

    // Simulate email sending delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error('Contact form error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid input data',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

// Prevent other HTTP methods
export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
