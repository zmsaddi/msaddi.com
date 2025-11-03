/**
 * Loading skeleton for services page
 *
 * This creates a skeleton UI that mimics the actual services page layout
 * providing a better UX than a blank page or spinner.
 */
export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            {/* Title Skeleton */}
            <div className="h-12 bg-surface-white/20 rounded-lg mb-4 w-3/4 animate-pulse" />
            {/* Subtitle Skeleton */}
            <div className="h-6 bg-surface-white/20 rounded-lg mb-6 w-1/2 animate-pulse" />
            {/* Description Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-surface-white/20 rounded w-full animate-pulse" />
              <div className="h-4 bg-surface-white/20 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Skeleton */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-surface-white rounded-xl p-6 shadow-md animate-pulse"
            >
              {/* Icon Skeleton */}
              <div className="w-16 h-16 bg-surface rounded-full mb-4" />
              {/* Title Skeleton */}
              <div className="h-6 bg-surface rounded mb-3 w-3/4" />
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-surface rounded w-full" />
                <div className="h-4 bg-surface rounded w-5/6" />
                <div className="h-4 bg-surface rounded w-4/6" />
              </div>
              {/* Button Skeleton */}
              <div className="h-10 bg-surface rounded-lg mt-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
