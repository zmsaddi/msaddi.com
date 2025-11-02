"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "/flags/uk.svg",
    label: "English",
    shortLabel: "EN",
    dir: "ltr",
    alt: "United Kingdom"
  },
  {
    code: "ar",
    name: "العربية",
    flag: "/flags/sy.svg",
    label: "العربية",
    shortLabel: "AR",
    dir: "rtl",
    alt: "Syria"
  },
  {
    code: "tr",
    name: "Türkçe",
    flag: "/flags/tr.svg",
    label: "Türkçe",
    shortLabel: "TR",
    dir: "ltr",
    alt: "Turkey"
  },
];

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const t = useTranslations("common.accessibility");
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === locale);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode: string) => {
    const segments = pathname.split("/");
    segments[1] = langCode;
    const newPath = segments.join("/");
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Professional Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-3 py-2",
          "bg-white border border-gray-200 rounded-lg",
          "hover:border-blue-400 hover:shadow-md",
          "transition-all duration-200",
          "text-sm font-medium text-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        )}
        aria-label={t("selectLanguage")}
        aria-expanded={isOpen}
      >
        {currentLanguage?.flag && (
          <Image
            src={currentLanguage.flag}
            alt={currentLanguage.alt}
            width={20}
            height={14}
            className="rounded-sm"
          />
        )}
        <span className="hidden sm:inline text-gray-700">
          {currentLanguage?.label}
        </span>
        <span className="sm:hidden text-gray-700">
          {currentLanguage?.shortLabel}
        </span>
        <svg
          className={cn(
            "w-4 h-4 text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Professional Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute mt-2 w-52 py-1",
            locale === "ar" ? "left-0" : "right-0",
            "bg-white rounded-lg border border-gray-200",
            "shadow-lg z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("selectLanguage")}
            </p>
          </div>

          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5",
                "hover:bg-gray-50 transition-colors duration-150",
                "text-sm",
                locale === lang.code
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700"
              )}
              dir={lang.dir}
            >
              <Image
                src={lang.flag}
                alt={lang.alt}
                width={24}
                height={17}
                className="rounded-sm shadow-sm flex-shrink-0"
              />
              <div className="flex-1 text-left">
                <div className="font-medium">{lang.label}</div>
                <div className="text-xs text-gray-500">{lang.name}</div>
              </div>
              {locale === lang.code && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}