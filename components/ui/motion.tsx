'use client';

/**
 * Dynamic Motion Components
 *
 * This file provides dynamically imported motion components from Framer Motion.
 * Benefits:
 * - Reduces initial bundle size by ~40KB
 * - Only loads when animations are needed
 * - Improves First Load JS significantly
 *
 * Usage:
 * Instead of: import { motion } from 'framer-motion'
 * Use: import { motion } from '@/components/ui/motion'
 */

import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';

// Create a loading placeholder that matches motion.div dimensions
const MotionPlaceholder = ({ children, className, ...props }: any) => (
  <div className={className} {...props}>
    {children}
  </div>
);

/**
 * Dynamically imported motion components
 * Reduces initial JS bundle by deferring framer-motion load
 */

// motion.div - Most commonly used
export const MotionDiv = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.div as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false, // Disable SSR for animations (improves server performance)
  }
);

// motion.section
export const MotionSection = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.section as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

// motion.li
export const MotionLi = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.li as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

// motion.h1
export const MotionH1 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h1 as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

// motion.h2
export const MotionH2 = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.h2 as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

// motion.p
export const MotionP = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.p as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

// motion.button
export const MotionButton = dynamic(
  () => import('framer-motion').then((mod) => mod.motion.button as ComponentType<any>),
  {
    loading: () => <MotionPlaceholder />,
    ssr: false,
  }
);

/**
 * For backward compatibility, export as 'motion' object
 * This allows direct replacement of framer-motion imports
 */
export const motion = {
  div: MotionDiv,
  section: MotionSection,
  li: MotionLi,
  h1: MotionH1,
  h2: MotionH2,
  p: MotionP,
  button: MotionButton,
};

/**
 * Export AnimatePresence separately as it's used less frequently
 */
export const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  {
    ssr: false,
  }
);

// Export default for convenience
export default motion;
