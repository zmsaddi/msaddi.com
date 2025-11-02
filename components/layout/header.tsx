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
        "bg-white/95 backdrop-blur-md border-b border-gray-100",
        // Desktop height: 88px normal, 76px scrolled
        // Mobile height: 72px normal, 64px scrolled
        isScrolled
          ? "lg:h-[76px] h-[64px] shadow-md"
          : "lg:h-[88px] h-[72px] shadow-sm"
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
            {/* Logo with responsive dimensions maintaining aspect ratio 2.77:1 */}
            <Image
              src="/logo.png"
              alt={tCommon("companyLogo")}
              width={240}
              height={87}  // Actual aspect ratio: 240/87 = 2.76
              priority
              className={cn(
                "object-contain transition-all duration-300",
                // Desktop: 240px width when normal, 200px when scrolled
                // Mobile: 140px width when normal, 120px when scrolled
                isScrolled
                  ? "lg:w-[200px] lg:h-[72px] w-[120px] h-[43px]"
                  : "lg:w-[240px] lg:h-[87px] w-[140px] h-[50px]"
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
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
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

            {/* CTA Button */}
            <Link
              className={cn(
                "px-6 py-2.5 bg-blue-600 text-white rounded-xl",
                "font-medium text-sm shadow-md",
                "hover:bg-blue-700 hover:shadow-lg",
                "transition-all duration-200",
                "whitespace-nowrap"
              )}
              href={`/${locale}/contact`}
            >
              {t("requestQuote")}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            "lg:hidden p-2.5 rounded-lg",
            "hover:bg-gray-100 transition-colors"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={tCommon("toggleMenu")}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-700" />
          ) : (
            <Menu className="h-5 w-5 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "lg:hidden fixed left-0 right-0 bg-white border-t border-gray-100",
          "transition-all duration-300 shadow-lg",
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
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  )}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
            <LanguageSwitcher />
            <Link
              className={cn(
                "block text-center px-6 py-3",
                "bg-blue-600 text-white rounded-xl",
                "font-medium text-sm shadow-md"
              )}
              href={`/${locale}/contact`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("requestQuote")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}