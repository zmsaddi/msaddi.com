"use client";

import { useTranslations } from "next-intl";

interface GoogleMapProps {
  className?: string;
}

export function GoogleMap({ className }: GoogleMapProps) {
  const t = useTranslations("contact");

  // MSADDI.EST Location in Al-Shaqeef Industrial Zone
  // Coordinates from the provided Google Maps link
  const latitude = "36.253684";
  const longitude = "37.1688932";
  const mapUrl = "https://maps.app.goo.gl/fJug9ePVizwekFcJA";

  // Embed map URL - Direct embed for MSADDI.EST location
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d804.3539281240228!2d37.169536930357005!3d36.253685079751314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x152ff96f2f51de0f%3A0x261c0cb1b2431c52!2z2YXYpNiz2LPYqSDZhdiz2K_Zig!5e0!3m2!1sar!2ses!4v1762063927618!5m2!1sar!2ses";

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Map Header */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {t("map.title")}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Al-Shaqeef Industrial Zone, Aleppo, Syria
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
                Al-Shaqeef Industrial Zone, Aleppo
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
        {/* Location Type */}
        <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-semibold text-gray-900">Al-Shaqeef Zone</p>
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
              <p className="text-xs text-gray-500">Zone Type</p>
              <p className="text-sm font-semibold text-gray-900">Industrial Area</p>
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
              <p className="text-xs text-gray-500">Transportation</p>
              <p className="text-sm font-semibold text-gray-900">Easy Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}