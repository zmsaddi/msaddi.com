"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-dark-base text-light-neutral">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="MSADDI.EST"
                width={40}
                height={40}
                className="rounded-md"
              />
              <span className="font-heading font-semibold text-lg">MSADDI.EST</span>
            </Link>
            <p className="text-sm text-silver-accent">{t("companyDescription")}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-silver-accent hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">{t("contactInfo")}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-silver-accent">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:info@msaddi.com"
                  className="hover:text-primary transition-colors"
                >
                  info@msaddi.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-silver-accent">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+963944244604"
                  className="hover:text-primary transition-colors"
                >
                  +963 944 244 604
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-silver-accent">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>{t("location")}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Business Hours</h3>
            <ul className="space-y-2 text-sm text-silver-accent">
              <li>Saturday - Thursday: 8:00 AM - 6:00 PM</li>
              <li>Friday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-metal-gray/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-silver-accent">
              © {currentYear} MSADDI.EST. {t("allRightsReserved")}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-silver-accent hover:text-primary transition-colors"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-silver-accent hover:text-primary transition-colors"
              >
                {t("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}