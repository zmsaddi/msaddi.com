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
  const locale = useLocale();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/services`, label: t("services") },
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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
        "h-20 bg-surface backdrop-blur-md",
        isScrolled ? "shadow-elevation-2" : "shadow-elevation-1"
      )}
    >
      <nav className="h-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Material Design 3: 250% larger */}
          <Link
            className={cn(
              "flex items-center gap-4 p-4 -ml-4",
              "hover:bg-primary/5 rounded-md-lg transition-colors"
            )}
            href={`/${locale}`}
          >
            <div className="relative">
              {/* Larger logo with Material elevation */}
              <div className="absolute inset-0 bg-primary/10 rounded-md-md blur-xl" />
              <Image
                src="/logo.png"
                alt="MSADDI.EST"
                width={100}  // Minimum 100px for desktop
                height={100}
                priority
                className="relative rounded-md-md lg:w-[100px] lg:h-[100px] w-[60px] h-[60px]"
              />
            </div>
            <div className="hidden lg:block">
              <span className="text-headline-sm font-cairo font-bold text-text-primary">
                MSADDI.EST
              </span>
              <span className="block text-label-lg text-text-secondary">
                {locale === "ar" ? "مسدّي للصناعات المعدنية" : "Metal Fabrication"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Material Design 3 */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "px-6 py-3 rounded-md-full text-body-md font-medium",
                      "transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary text-white shadow-elevation-3"
                        : "text-text-primary hover:bg-primary/10"
                    )}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />

              {/* CTA Button - Material Design 3 */}
              <Link
                className={cn(
                  "px-8 py-3 bg-primary text-white rounded-md-full",
                  "font-medium text-body-md shadow-elevation-3",
                  "hover:bg-primary-dark hover:shadow-elevation-4",
                  "transition-all duration-200"
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
              "lg:hidden p-3 rounded-md-md",
              "hover:bg-primary/10 transition-colors"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Menu - Material Design 3 Drawer */}
        <div
          className={cn(
            "lg:hidden fixed left-0 right-0 bg-surface shadow-elevation-5",
            "transition-all duration-300",
            isMobileMenuOpen
              ? "top-20 opacity-100 visible"
              : "top-16 opacity-0 invisible"
          )}
        >
          <div className="px-6 py-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={cn(
                      "block px-6 py-3 rounded-md-lg text-body-md font-medium",
                      "transition-all duration-200",
                      pathname === item.href
                        ? "bg-primary text-white"
                        : "text-text-primary hover:bg-primary/10"
                    )}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-outline space-y-4">
              <LanguageSwitcher />
              <Link
                className={cn(
                  "block text-center px-8 py-3",
                  "bg-primary text-white rounded-md-full",
                  "font-medium text-body-md shadow-elevation-3"
                )}
                href={`/${locale}/contact`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("requestQuote")}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}