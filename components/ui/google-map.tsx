"use client";

import { useTranslations } from "next-intl";

interface GoogleMapProps {
  className?: string;
}

export function GoogleMap({ className }: GoogleMapProps) {
  const t = useTranslations("contact");

  // MSADDI.EST Location in Aleppo Industrial City
  // Coordinates from the provided Google Maps link
  const latitude = "36.3089";
  const longitude = "37.0713";
  const mapUrl = "https://maps.app.goo.gl/qBBd4SVV8WXAarraA";

  // Embed map URL with proper coordinates
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.8923456789!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzMyLjAiTiAzN8KwMDQnMTYuNyJF!5e0!3m2!1sen!2s!4v${Date.now()}`;

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Map Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("map.title")}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Sheikh Najjar Industrial City, Aleppo, Syria
          </p>
        </div>

        {/* Google Maps Iframe */}
        <div className="relative w-full h-[450px]">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="MSADDI.EST Location Map"
          />
        </div>

        {/* Map Footer with Directions Button */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm font-medium text-gray-900">
                MSADDI.EST Metal Fabrication
              </p>
              <p className="text-xs text-gray-600 mt-0.5">
                Industrial Zone, Sheikh Najjar, Aleppo
              </p>
            </div>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Get Directions
            </a>
          </div>
        </div>
      </div>

      {/* Additional Location Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        {/* Distance from City Center */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Distance</p>
              <p className="text-sm font-semibold text-gray-900">15 km from center</p>
            </div>
          </div>
        </div>

        {/* Industrial Zone */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Zone</p>
              <p className="text-sm font-semibold text-gray-900">Industrial City</p>
            </div>
          </div>
        </div>

        {/* Easy Access */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Access</p>
              <p className="text-sm font-semibold text-gray-900">Main Highway</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}