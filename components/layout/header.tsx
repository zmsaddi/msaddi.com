"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
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
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 dark:bg-dark-base/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-md opacity-20" />
              <Image
                src="/logo.png"
                alt="MSADDI.EST"
                width={48}
                height={48}
                className="relative rounded-md"
                priority
              />
            </div>
            <span className="font-heading font-semibold text-xl">MSADDI.EST</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "font-medium transition-colors hover:text-primary",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <LanguageSwitcher />
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t("requestQuote")}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden fixed left-0 right-0 bg-white dark:bg-dark-base shadow-xl transition-all duration-300",
            isMobileMenuOpen
              ? "top-20 opacity-100 visible"
              : "top-16 opacity-0 invisible"
          )}
        >
          <div className="container-custom py-6">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-2 font-medium transition-colors hover:text-primary",
                      pathname === item.href && "text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-metal-light/20 space-y-4">
              <div className="flex items-center gap-4">
                <ThemeSwitcher showLabel />
                <LanguageSwitcher />
              </div>
              <Link
                href={`/${locale}/contact`}
                className="btn-primary block text-center"
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