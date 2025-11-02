"use client";

import { useEffect, useState, useCallback } from "react";
import { trackScrollDepth } from "@/lib/gtag";

export function ScrollDepthTracker() {
  const [trackedDepths, setTrackedDepths] = useState<Set<number>>(new Set());

  const handleScroll = useCallback(() => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = Math.round((winScroll / height) * 100);

    // Track at 25%, 50%, 75%, and 100% milestones
    const milestones = [25, 50, 75, 100];

    milestones.forEach((milestone) => {
      if (scrolled >= milestone && !trackedDepths.has(milestone)) {
        trackScrollDepth(milestone);
        setTrackedDepths((prev) => new Set(prev).add(milestone));
      }
    });
  }, [trackedDepths]);

  useEffect(() => {
    // Debounce scroll event
    let timeoutId: NodeJS.Timeout;

    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 150);
    };

    window.addEventListener("scroll", debouncedHandleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
      clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  return null; // This component doesn't render anything
}