/**
 * Performance Utilities Tests
 *
 * Unit tests for performance utility functions
 */

import {
  prefersReducedMotion,
  debounce,
  throttle,
  isMobileDevice,
  isSlowConnection,
  isLowEndDevice,
} from '@/lib/performance';

describe('Performance Utilities', () => {
  describe('prefersReducedMotion', () => {
    it('returns boolean', () => {
      const result = prefersReducedMotion();
      expect(typeof result).toBe('boolean');
    });

    it('returns false in test environment', () => {
      expect(prefersReducedMotion()).toBe(false);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('debounces function calls', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc();
      debouncedFunc();
      debouncedFunc();

      expect(func).not.toHaveBeenCalled();

      jest.runAllTimers();

      expect(func).toHaveBeenCalledTimes(1);
    });

    it('calls function with correct arguments', () => {
      const func = jest.fn();
      const debouncedFunc = debounce(func, 1000);

      debouncedFunc('test', 123);

      jest.runAllTimers();

      expect(func).toHaveBeenCalledWith('test', 123);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });

  describe('throttle', () => {
    jest.useFakeTimers();

    it('throttles function calls', () => {
      const func = jest.fn();
      const throttledFunc = throttle(func, 1000);

      throttledFunc();
      throttledFunc();
      throttledFunc();

      // First call should execute immediately
      expect(func).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);

      throttledFunc();

      // Second call should execute after throttle period
      expect(func).toHaveBeenCalledTimes(2);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });

  describe('isMobileDevice', () => {
    it('returns boolean', () => {
      const result = isMobileDevice();
      expect(typeof result).toBe('boolean');
    });

    it('returns false in test environment', () => {
      expect(isMobileDevice()).toBe(false);
    });

    it('detects mobile user agents', () => {
      Object.defineProperty(window.navigator, 'userAgent', {
        value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
        configurable: true,
      });

      expect(isMobileDevice()).toBe(true);
    });
  });

  describe('isSlowConnection', () => {
    it('returns boolean', () => {
      const result = isSlowConnection();
      expect(typeof result).toBe('boolean');
    });

    it('returns false when connection API not available', () => {
      expect(isSlowConnection()).toBe(false);
    });
  });

  describe('isLowEndDevice', () => {
    it('returns boolean', () => {
      const result = isLowEndDevice();
      expect(typeof result).toBe('boolean');
    });

    it('returns false when deviceMemory not available', () => {
      expect(isLowEndDevice()).toBe(false);
    });
  });
});
