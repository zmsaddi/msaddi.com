"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/gtag";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const features = [
    t("stats.years") + " " + t("stats.yearsLabel"),
    t("stats.projects") + " " + t("stats.projectsLabel"),
    t("stats.satisfaction") + " " + t("stats.satisfactionLabel"),
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Industrial background image with overlay - Material Design 3 - OPTIMIZED */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-metal-workshop.jpg"
          alt="MSADDI Metal Fabrication Workshop - Professional Laser Cutting Services Aleppo Syria"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/50 to-primary/55" />
      </div>

      {/* Content Container with proper spacing from header */}
      <div className="container mx-auto px-6 lg:px-12 pt-[120px] lg:pt-[136px] pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Text Content - Material Design 3 Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Main Heading - 48px as specified */}
            <h1 className={cn(
              "text-[42px] lg:text-[48px] leading-[1.2]",
              isRTL ? "font-cairo" : "font-inter",
              "font-bold text-white mb-6"
            )}>
              {t("title")}
              <span className="block text-accent mt-2">
                {t("subtitle")}
              </span>
            </h1>

            {/* Description - Material body text */}
            <p className={cn(
              "text-body-lg text-white/90 mb-8",
              "max-w-xl leading-[1.8]",
              isRTL ? "font-tajawal" : "font-inter"
            )}>
              {t("description")}
            </p>

            {/* Features List - Simple and clean */}
            <ul className="space-y-4 mb-12">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className={cn(
                    "text-body-md text-white",
                    isRTL ? "font-tajawal" : "font-inter"
                  )}>
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Material Design 3 Extended FAB Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={`/${locale}/contact`}
                onClick={() => trackButtonClick("hero_cta_primary")}
                className={cn(
                  "btn-fab-extended inline-flex",
                  "text-body-lg",
                  isRTL ? "font-tajawal" : "font-inter"
                )}
              >
                {t("cta1")}
                <ArrowRight className={cn(
                  "h-5 w-5",
                  isRTL && "rotate-180"
                )} />
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Material Design 3 Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main card with Material elevation */}
              <div className={cn(
                "relative rounded-md-xl overflow-hidden",
                "bg-surface shadow-elevation-2",
                "border border-outline"
              )}>
                <div className="aspect-[4/3] relative bg-gradient-to-br from-primary/10 to-secondary/10">
                  {/* Hero visual placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <p className={cn(
                        "text-headline-sm text-text-primary font-medium",
                        isRTL ? "font-cairo" : "font-inter"
                      )}>
                        {locale === "ar" ? "تصنيع معادن احترافي" : "Professional Metal Fabrication"}
                      </p>
                      <p className={cn(
                        "text-body-md text-text-secondary mt-2",
                        isRTL ? "font-tajawal" : "font-inter"
                      )}>
                        {locale === "ar" ? "جودة عالية • دقة متناهية" : "High Quality • Precision Engineering"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards - Material Design 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className={cn(
                  "absolute -bottom-6",
                  isRTL ? "-right-6" : "-left-6",
                  "bg-surface rounded-md-lg p-4",
                  "shadow-elevation-3 border border-outline"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md-full bg-success/20 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="text-headline-sm font-bold text-text-primary">30+</p>
                    <p className={cn(
                      "text-label-lg text-text-secondary",
                      isRTL ? "font-tajawal" : "font-inter"
                    )}>
                      {locale === "ar" ? "سنوات خبرة" : "Years Experience"}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className={cn(
                  "absolute -top-6",
                  isRTL ? "-left-6" : "-right-6",
                  "bg-surface rounded-md-lg p-4",
                  "shadow-elevation-3 border border-outline"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-md-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-headline-sm font-bold text-text-primary">40mm</p>
                    <p className={cn(
                      "text-label-lg text-text-secondary",
                      isRTL ? "font-tajawal" : "font-inter"
                    )}>
                      {locale === "ar" ? "قص ليزر" : "Laser Cutting"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom stats bar - Material Design 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-24 pt-12 border-t border-white/20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "6000×2500", label: locale === "ar" ? "مساحة القص" : "Cutting Area", unit: "mm" },
              { value: "135T", label: locale === "ar" ? "قوة الثني" : "Bending Force", unit: "" },
              { value: "99%", label: locale === "ar" ? "رضا العملاء" : "Satisfaction", unit: "" },
              { value: "500+", label: locale === "ar" ? "مشاريع منجزة" : "Projects", unit: "" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="text-center"
              >
                <p className={cn(
                  "text-headline-lg font-bold text-accent latin-numerals",
                  isRTL ? "font-cairo" : "font-inter"
                )}>
                  {stat.value}
                  {stat.unit && <span className="text-body-lg font-normal">{stat.unit}</span>}
                </p>
                <p className={cn(
                  "text-label-lg text-white/80 mt-1",
                  isRTL ? "font-tajawal" : "font-inter"
                )}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}