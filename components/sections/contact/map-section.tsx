"use client";

import { GoogleMap } from "@/components/ui/google-map";

export function MapSection() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <GoogleMap />
      </div>
    </section>
  );
}