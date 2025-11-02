"use client";

import { GoogleMap } from "@/components/ui/google-map";

export function MapSection() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <GoogleMap />
      </div>
    </section>
  );
}