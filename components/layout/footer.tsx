"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common.accessibility");
  const tContact = useTranslations("contact.info");
  const tHours = useTranslations("contact.hours");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const _isRTL = locale === "ar";

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-surface-footer border-t border-divider">
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-5">
            <Link href={`/${locale}`} className="inline-block hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt={tCommon("companyLogo")}
                width={160}
                height={58}
                className="w-[160px] h-[58px] object-contain"
              />
            </Link>
            <p className="text-base text-text-secondary leading-relaxed">
              {t("companyDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-text-primary">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-text-secondary hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-text-primary">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${tContact("items.email.value")}`}
                  className="text-base text-text-secondary hover:text-primary transition-colors duration-200"
                  dir="ltr"
                >
                  {tContact("items.email.value")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${tContact("items.phone.value").replace(/\s/g, '')}`}
                  className="text-base text-text-secondary hover:text-primary transition-colors duration-200 latin-numerals"
                  dir="ltr"
                >
                  {tContact("items.phone.value")}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-base text-text-secondary">{t("location")}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours - Fully Translated */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-text-primary">
              {t("businessHours")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base text-text-secondary">
                  {tHours("days.weekdays")}:
                  <span className="latin-numerals font-medium text-text-primary" dir="ltr"> {tHours("times.weekdays")}</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-base text-text-secondary">
                  {tHours("days.weekend")}: <span className="text-text-primary font-medium">{tHours("times.weekend")}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-divider">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-text-secondary">
              © <span className="latin-numerals" dir="ltr">{currentYear}</span> {t("companyName")} – {t("allRightsReserved")}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-text-secondary hover:text-primary transition-colors duration-200"
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