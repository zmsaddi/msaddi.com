/**
 * Loading skeleton for about page
 */
export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 bg-surface-white/20 rounded-lg mb-4 w-2/3 mx-auto animate-pulse" />
            <div className="h-6 bg-surface-white/20 rounded-lg w-1/2 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Skeleton */}
          <div className="aspect-video bg-surface rounded-xl animate-pulse" />

          {/* Text Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-surface rounded w-3/4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-surface rounded w-full animate-pulse" />
              <div className="h-4 bg-surface rounded w-5/6 animate-pulse" />
              <div className="h-4 bg-surface rounded w-4/6 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Values Grid Skeleton */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center animate-pulse">
              <div className="w-16 h-16 bg-surface rounded-full mx-auto mb-4" />
              <div className="h-6 bg-surface rounded w-2/3 mx-auto mb-2" />
              <div className="h-4 bg-surface rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
