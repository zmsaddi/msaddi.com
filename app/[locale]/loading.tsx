import { Loader2 } from 'lucide-react';

/**
 * Loading UI for the root page
 *
 * This displays while the main page is loading.
 * Uses a simple spinner with the brand color.
 */
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    </div>
  );
}
