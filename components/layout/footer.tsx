"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common.accessibility");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const isRTL = locale === "ar";

  const quickLinks = [
    { href: `/${locale}`, label: tNav("home") },
    { href: `/${locale}/services`, label: tNav("services") },
    { href: `/${locale}/about`, label: tNav("about") },
    { href: `/${locale}/contact`, label: tNav("contact") },
  ];

  return (
    <footer className="bg-gray-50 border-t-2 border-gray-200">
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
                priority
              />
            </Link>
            <p className="text-base text-gray-600 leading-relaxed">
              {t("companyDescription")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-900">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-900">
              {t("contactInfo")}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a
                  href="mailto:info@msaddi.com"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  dir="ltr"
                >
                  info@msaddi.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <a
                  href="tel:+963944244604"
                  className="text-base text-gray-600 hover:text-blue-600 transition-colors duration-200 latin-numerals"
                  dir="ltr"
                >
                  +963 944 244 604
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-base text-gray-600">{t("location")}</span>
              </li>
            </ul>
          </div>

          {/* Business Hours - Fully Translated */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-gray-900">
              {t("businessHours")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-base text-gray-600">
                  {t("workDays")}:
                  <span className="latin-numerals font-medium text-gray-900" dir="ltr"> 8:00 - 18:00</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span className="text-base text-gray-600">
                  {t("friday")}: <span className="text-gray-900 font-medium">{t("closed")}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © <span className="latin-numerals" dir="ltr">{currentYear}</span> MSADDI.EST. {t("allRightsReserved")}
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                {t("privacyPolicy")}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
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