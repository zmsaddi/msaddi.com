"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
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
        // Desktop height: 88px normal, 76px scrolled
        // Mobile height: 72px normal, 64px scrolled
        isScrolled
          ? "lg:h-[76px] h-[64px] shadow-elevation-2"
          : "lg:h-[88px] h-[72px] shadow-elevation-1"
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
            {/* Logo with responsive dimensions - MD3 specs: 260px min width with 16px clearance */}
            <Image
              src="/logo.png"
              alt={tCommon("companyLogo")}
              width={260}
              height={94}  // Maintaining aspect ratio: 260/94 = 2.77
              priority
              className={cn(
                "object-contain transition-all duration-300",
                // Desktop: 260px width when normal, 220px when scrolled
                // Mobile: 160px width when normal, 140px when scrolled
                isScrolled
                  ? "lg:w-[220px] lg:h-[79px] w-[140px] h-[51px]"
                  : "lg:w-[260px] lg:h-[94px] w-[160px] h-[58px]"
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

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2.5 rounded-lg",
            "hover:bg-surface transition-colors"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={tCommon("toggleMenu")}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-text-primary" />
          ) : (
            <Menu className="h-5 w-5 text-text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "lg:hidden fixed left-0 right-0 bg-surface-white border-t border-outline",
          "transition-all duration-300 shadow-elevation-3",
          isMobileMenuOpen
            ? cn(
                isScrolled ? "top-[64px]" : "top-[72px]",
                "opacity-100 visible"
              )
            : cn(
                isScrolled ? "top-[56px]" : "top-[64px]",
                "opacity-0 invisible"
              )
        )}
      >
        <div className="px-6 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  className={cn(
                    "block px-4 py-3 rounded-lg text-sm font-medium",
                    "transition-all duration-200",
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