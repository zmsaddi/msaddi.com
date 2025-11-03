/**
 * Loading skeleton for contact page
 */
export default function ContactLoading() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-12 bg-surface-white/20 rounded-lg mb-4 w-1/2 mx-auto animate-pulse" />
            <div className="h-6 bg-surface-white/20 rounded-lg w-2/3 mx-auto animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Skeleton */}
          <div className="space-y-6">
            <div className="h-12 bg-surface-white rounded-lg animate-pulse" />
            <div className="h-12 bg-surface-white rounded-lg animate-pulse" />
            <div className="h-12 bg-surface-white rounded-lg animate-pulse" />
            <div className="h-32 bg-surface-white rounded-lg animate-pulse" />
            <div className="h-12 bg-primary/20 rounded-lg w-32 animate-pulse" />
          </div>

          {/* Contact Info Skeleton */}
          <div className="space-y-6">
            <div className="bg-surface-white rounded-xl p-6 animate-pulse">
              <div className="h-6 bg-surface rounded w-1/3 mb-4" />
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-surface rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-surface rounded w-1/3" />
                      <div className="h-4 bg-surface rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Skeleton */}
            <div className="aspect-video bg-surface-white rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
