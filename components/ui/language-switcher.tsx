"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧", label: "EN", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", label: "عربي", dir: "rtl" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷", label: "TR", dir: "ltr" },
];

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2.5",
          "bg-surface-container rounded-md-full border border-outline",
          "hover:bg-primary/10 transition-all duration-200",
          "text-body-md font-medium text-text-primary",
          "shadow-elevation-1 hover:shadow-elevation-2",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        )}
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="h-5 w-5 text-primary" />
        <span className="flex items-center gap-1.5">
          {currentLanguage?.flag}
          <span className="hidden sm:inline">{currentLanguage?.label}</span>
        </span>
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className={cn(
          "absolute mt-2 w-48 py-2",
          locale === "ar" ? "left-0" : "right-0",
          "bg-surface rounded-md-lg border border-outline",
          "shadow-elevation-4 animate-fade-in z-50"
        )}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={cn(
                "flex items-center gap-3 w-full px-4 py-3 text-left",
                "hover:bg-primary/10 transition-colors duration-150",
                "text-body-md",
                locale === lang.code
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-text-primary"
              )}
              dir={lang.dir}
            >
              <span className="text-xl">{lang.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.label}</span>
                <span className="text-xs text-text-secondary">{lang.name}</span>
              </div>
              {locale === lang.code && (
                <svg className="w-5 h-5 text-primary ml-auto" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}