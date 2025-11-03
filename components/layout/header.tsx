"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { cn } from "@/lib/utils";

export function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common.accessibility");
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = locale === "ar";

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "bg-surface-white border-b border-outline",
        // ⚡ MOBILE-OPTIMIZED: Smaller header on mobile devices
        // Mobile: 56px normal, 52px scrolled
        // Tablet: 64px normal, 60px scrolled
        // Desktop: 88px normal, 76px scrolled
        isScrolled
          ? "h-[52px] sm:h-[60px] lg:h-[76px] shadow-elevation-2"
          : "h-[56px] sm:h-[64px] lg:h-[88px] shadow-elevation-1"
      )}
    >
      <nav className="h-full container-custom flex items-center justify-between">
        {/* Logo Container with Safe Area */}
        <Link
          className={cn(
            "flex items-center",
            // Ensure proper spacing from edges
            isRTL ? "ml-4 lg:ml-6" : "mr-4 lg:mr-6"
          )}
          href={`/${locale}`}
        >
          <div className={cn(
            "relative flex items-center justify-center",
            // Safe area padding: Desktop 20px, Mobile 16px
            "py-4 lg:py-5"
          )}>
            {/* ⚡ MOBILE-OPTIMIZED: Smaller logo on mobile devices */}
            <Image
              src="/logo.png"
              alt={tCommon("companyLogo")}
              width={260}
              height={94}  // Maintaining aspect ratio: 260/94 = 2.77
              className={cn(
                "object-contain transition-all duration-300",
                // ⚡ Mobile: 110px normal, 100px scrolled (smaller)
                // Tablet: 140px normal, 130px scrolled
                // Desktop: 260px normal, 220px scrolled
                isScrolled
                  ? "w-[100px] h-[36px] sm:w-[130px] sm:h-[47px] lg:w-[220px] lg:h-[79px]"
                  : "w-[110px] h-[40px] sm:w-[140px] sm:h-[51px] lg:w-[260px] lg:h-[94px]"
              )}
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "px-5 py-2.5 rounded-xl text-sm font-medium",
                    "transition-all duration-200",
                    pathname === item.href
                      ? "bg-primary text-white shadow-elevation-2"
                      : "text-text-primary hover:bg-primary/10 hover:text-primary"
                  )}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
          </div>
        </div>

        {/* ⚡ MOBILE-OPTIMIZED: Larger touch targets and inline SVG icons for instant loading */}
        <button
          className={cn(
            "lg:hidden p-3 rounded-lg min-h-[44px] min-w-[44px]",
            "hover:bg-surface transition-colors",
            "flex items-center justify-center"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={tCommon("toggleMenu")}
        >
          {isMobileMenuOpen ? (
            // X (Close) Icon - Inline SVG
            <svg
              className="h-6 w-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Menu (Hamburger) Icon - Inline SVG
            <svg
              className="h-6 w-6 text-text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* ⚡ MOBILE-OPTIMIZED: Faster animations and better touch targets */}
      <div
        className={cn(
          "lg:hidden fixed left-0 right-0 bg-surface-white border-t border-outline",
          "transition-all duration-200 shadow-elevation-3",
          isMobileMenuOpen
            ? cn(
                // Updated for new header heights: 52px/60px scrolled, 56px/64px normal
                isScrolled ? "top-[52px] sm:top-[60px]" : "top-[56px] sm:top-[64px]",
                "opacity-100 visible"
              )
            : cn(
                isScrolled ? "top-[44px] sm:top-[52px]" : "top-[48px] sm:top-[56px]",
                "opacity-0 invisible"
              )
        )}
      >
        <div className="px-4 py-4 sm:px-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    // ⚡ Larger touch targets: min 56px height
                    "block px-4 py-4 rounded-lg text-base font-medium",
                    "transition-all duration-200 min-h-[56px]",
                    "flex items-center",
                    pathname === item.href
                      ? "bg-primary text-white shadow-elevation-1"
                      : "text-text-primary hover:bg-primary/10 hover:text-primary"
                  )}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-divider">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}