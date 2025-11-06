/**
 * Distributed Rate Limiter using Vercel KV (Redis)
 *
 * ⚠️ IMPORTANT: Rate limiting is OPTIONAL
 * - If KV_REST_API_URL and KV_REST_API_TOKEN are not configured, rate limiting is disabled
 * - The contact form will still work without rate limiting
 * - To enable rate limiting, set up Vercel KV:
 *   1. Go to Vercel Dashboard → Storage → Create KV Database
 *   2. Add to your project (automatically adds env vars)
 *   3. Redeploy
 *
 * Security: It's recommended to enable rate limiting in production to prevent spam
 */

// Conditional import of Vercel KV - only if environment variables are present
let kv: any = null;
let kvAvailable = false;

try {
  // Check if KV environment variables are available
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    // Dynamic import to prevent initialization errors
    kv = require("@vercel/kv").kv;
    kvAvailable = true;
    // eslint-disable-next-line no-console
    console.log("✅ Vercel KV rate limiting is enabled");
  } else {
    // eslint-disable-next-line no-console
    console.log("⚠️  Vercel KV not configured - Rate limiting is DISABLED");
  }
} catch (error) {
  console.warn("Vercel KV not available, rate limiting will be disabled:", error);
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset: number;
  error?: string;
}

interface RateLimitConfig {
  /**
   * Maximum number of requests allowed per window
   */
  maxRequests: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  /**
   * Optional: Different limits for authenticated users (future)
   */
  premiumMaxRequests?: number;
}

// Default configuration: 3 requests per hour for contact form
const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 3,
  windowMs: 60 * 60 * 1000, // 1 hour
};

/**
 * Distributed rate limiter using Vercel KV (Redis)
 *
 * This implementation:
 * - Works across multiple servers (serverless functions)
 * - Persists through deployments
 * - Uses sliding window algorithm
 * - Supports different rate limits per endpoint
 *
 * @param identifier - Usually IP address or user ID
 * @param namespace - Endpoint namespace (e.g., 'contact-form', 'api')
 * @param config - Rate limit configuration
 * @returns Promise<RateLimitResult>
 */
export async function rateLimit(
  identifier: string,
  namespace: string = "default",
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<RateLimitResult> {
  // If KV is not available, allow all requests
  if (!kvAvailable || !kv) {
    console.warn("Rate limiting disabled: Vercel KV not configured");
    return {
      success: true,
      remaining: config.maxRequests,
      reset: 0,
      error: "Rate limiting disabled (KV not configured)",
    };
  }

  try {
    // Create a unique key for this identifier and namespace
    const key = `ratelimit:${namespace}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Use Redis sorted set to track requests
    // Score is timestamp, member is unique request ID

    // Remove old entries outside the time window
    await kv.zremrangebyscore(key, 0, windowStart);

    // Count requests in current window
    const requestCount = await kv.zcard(key);

    // Check if limit exceeded
    if (requestCount >= config.maxRequests) {
      // Get oldest request timestamp to calculate reset time
      const oldestRequest = await kv.zrange<number[]>(key, 0, 0, { withScores: true });
      const resetTime = oldestRequest[1] ? oldestRequest[1] + config.windowMs : now + config.windowMs;

      return {
        success: false,
        remaining: 0,
        reset: Math.ceil((resetTime - now) / 1000), // Return seconds until reset
        error: "Rate limit exceeded",
      };
    }

    // Add current request
    const requestId = `${now}:${Math.random()}`;
    await kv.zadd(key, { score: now, member: requestId });

    // Set expiration on the key to clean up automatically
    await kv.expire(key, Math.ceil(config.windowMs / 1000));

    // Calculate remaining requests and reset time
    const remaining = config.maxRequests - (requestCount + 1);
    const resetTime = now + config.windowMs;

    return {
      success: true,
      remaining,
      reset: Math.ceil((resetTime - now) / 1000),
    };
  } catch (error) {
    console.error("Rate limiter error:", error);

    // Fallback: Allow request if rate limiter fails
    // This prevents denial of service if Redis is down
    // But log the error for monitoring
    return {
      success: true,
      remaining: config.maxRequests,
      reset: 0,
      error: "Rate limiter unavailable - allowing request",
    };
  }
}

/**
 * Rate limit specifically for contact form submissions
 * 3 requests per hour per IP
 */
export async function rateLimitContactForm(ip: string): Promise<RateLimitResult> {
  return rateLimit(ip, "contact-form", {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  });
}

/**
 * Rate limit for general API endpoints
 * More lenient: 60 requests per minute
 */
export async function rateLimitAPI(ip: string): Promise<RateLimitResult> {
  return rateLimit(ip, "api-general", {
    maxRequests: 60,
    windowMs: 60 * 1000, // 1 minute
  });
}

/**
 * Aggressive rate limit for suspicious activity
 * Very strict: 1 request per 5 minutes
 */
export async function rateLimitSuspicious(ip: string): Promise<RateLimitResult> {
  return rateLimit(ip, "suspicious", {
    maxRequests: 1,
    windowMs: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Get current rate limit status without incrementing
 */
export async function getRateLimitStatus(
  identifier: string,
  namespace: string = "default",
  config: RateLimitConfig = DEFAULT_CONFIG
): Promise<{ count: number; remaining: number }> {
  // If KV is not available, return default values
  if (!kvAvailable || !kv) {
    return {
      count: 0,
      remaining: config.maxRequests,
    };
  }

  try {
    const key = `ratelimit:${namespace}:${identifier}`;
    const now = Date.now();
    const windowStart = now - config.windowMs;

    // Remove old entries
    await kv.zremrangebyscore(key, 0, windowStart);

    // Count requests
    const requestCount = await kv.zcard(key);

    return {
      count: requestCount,
      remaining: Math.max(0, config.maxRequests - requestCount),
    };
  } catch (error) {
    console.error("Error getting rate limit status:", error);
    return {
      count: 0,
      remaining: config.maxRequests,
    };
  }
}
