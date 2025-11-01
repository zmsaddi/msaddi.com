/**
 * Performance Optimization Utilities
 *
 * Helper functions for lazy loading, code splitting, and performance monitoring
 */

import { ComponentType, lazy } from 'react';

/**
 * Lazy load a component with retry logic
 * Useful for handling network errors during code splitting
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  componentImport: () => Promise<{ default: T }>,
  retries = 3,
  retryDelay = 1000
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    let lastError: Error | undefined;

    for (let i = 0; i < retries; i++) {
      try {
        return await componentImport();
      } catch (error) {
        lastError = error as Error;

        // Wait before retry
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
      }
    }

    // If all retries failed, throw the last error
    throw lastError || new Error('Failed to load component');
  });
}

/**
 * Preload a component
 * Call this to prefetch a lazy-loaded component before it's needed
 */
export function preloadComponent(
  componentImport: () => Promise<any>
) {
  return componentImport();
}

/**
 * Check if the user prefers reduced motion
 * Useful for disabling animations for accessibility
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vital]', metric.name, metric.value, metric.rating);
  }

  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}

/**
 * Intersection Observer hook for lazy loading
 */
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  });
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request Idle Callback with fallback
 */
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
): number {
  if (typeof window === 'undefined') {
    return 0;
  }

  if ('requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(callback, options);
  }

  // Fallback to setTimeout
  return (window as any).setTimeout(callback, 1) as number;
}

/**
 * Cancel Idle Callback with fallback
 */
export function cancelIdleCallback(id: number): void {
  if (typeof window === 'undefined') return;

  if ('cancelIdleCallback' in window) {
    (window as any).cancelIdleCallback(id);
  } else {
    clearTimeout(id);
  }
}

/**
 * Measure performance of an async function
 */
export async function measurePerformance<T>(
  name: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();

  try {
    const result = await fn();
    const duration = performance.now() - start;

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
    }

    return result;
  } catch (error) {
    const duration = performance.now() - start;
    console.error(`[Performance Error] ${name}: ${duration.toFixed(2)}ms`, error);
    throw error;
  }
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Check if connection is slow (2G/3G)
 */
export function isSlowConnection(): boolean {
  if (typeof navigator === 'undefined' || !('connection' in navigator)) {
    return false;
  }

  const connection = (navigator as any).connection;
  return connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
}

/**
 * Get device memory (if available)
 */
export function getDeviceMemory(): number | undefined {
  if (typeof navigator === 'undefined' || !('deviceMemory' in navigator)) {
    return undefined;
  }

  return (navigator as any).deviceMemory;
}

/**
 * Check if device has low memory
 */
export function isLowEndDevice(): boolean {
  const memory = getDeviceMemory();
  return memory !== undefined && memory < 4;
}
