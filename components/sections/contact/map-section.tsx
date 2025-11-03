"use client";

import GoogleMapDynamic from "@/components/ui/google-map-dynamic";

export function MapSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <GoogleMapDynamic />
      </div>
    </section>
  );
}