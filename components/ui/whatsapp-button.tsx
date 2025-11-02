"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function WhatsAppButton() {
  const tWhatsApp = useTranslations("common.whatsapp");
  const tAccessibility = useTranslations("common.accessibility");
  const [isVisible, setIsVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    // Show button after page loads
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip after button appears
      setTimeout(() => {
        setIsTooltipVisible(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => {
          setIsTooltipVisible(false);
        }, 5000);
      }, 1000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const phoneNumber = "+963944244604";
  const message = tWhatsApp("message");
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* WhatsApp Floating Button */}
      <div
        className={cn(
          "fixed bottom-6 right-6 z-40 transition-all duration-300",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
      >
        {/* Tooltip */}
        {isTooltipVisible && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2">
            <div className="relative bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
              <button
                onClick={() => setIsTooltipVisible(false)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-3 h-3 text-gray-600" />
              </button>
              <p className="text-sm font-medium text-gray-700">
                💬 {tWhatsApp("tooltip")}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {tWhatsApp("quickQuote")}
              </p>
              {/* Arrow pointing down */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={handleClick}
          className={cn(
            "group relative flex items-center justify-center",
            "w-14 h-14 bg-green-500 hover:bg-green-600",
            "rounded-full shadow-lg hover:shadow-xl",
            "transition-all duration-300 hover:scale-110",
            "focus:outline-none focus:ring-4 focus:ring-green-500/30"
          )}
          aria-label={tAccessibility("contactWhatsApp")}
        >
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25"></span>

          {/* WhatsApp Icon */}
          <svg
            className="w-7 h-7 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>

          {/* Hover Label */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            {tWhatsApp("label")}
          </span>
        </button>

        {/* Mobile Label (always visible on mobile) */}
        <div className="sm:hidden mt-2 text-center">
          <span className="text-xs text-gray-600 font-medium">{tWhatsApp("button")}</span>
        </div>
      </div>
    </>
  );
}