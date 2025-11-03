import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';

/**
 * Dynamically imported Google Map component
 *
 * Benefits:
 * - Reduces initial bundle by ~30KB
 * - Only loads when contact page is visited
 * - Improves performance on other pages
 */
const GoogleMapDynamic = dynamic(
  () => import('@/components/ui/google-map').then((mod) => mod.GoogleMap),
  {
    loading: () => (
      <div className="w-full h-[450px] bg-surface flex items-center justify-center rounded-xl border border-outline">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
          <p className="text-sm text-text-secondary">Loading map...</p>
        </div>
      </div>
    ),
    ssr: false, // Maps are client-side only
  }
);

export default GoogleMapDynamic;
