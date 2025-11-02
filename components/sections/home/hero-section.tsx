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
        <div className="max-w-4xl mx-auto">

          {/* Text Content Card - 70% Transparent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl"
          >
            {/* Main Heading - 48px as specified */}
            <h1 className={cn(
              "text-[42px] lg:text-[48px] leading-[1.2]",
              isRTL ? "font-cairo" : "font-inter",
              "font-bold text-gray-900 mb-6"
            )}>
              {t("title")}
              <span className="block text-accent mt-2">
                {t("subtitle")}
              </span>
            </h1>

            {/* Description - Material body text */}
            <p className={cn(
              "text-body-lg text-gray-700 mb-8",
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
                    "text-body-md text-gray-800",
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
        </div>

        {/* Bottom stats bar Card - 70% Transparent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-24 bg-white/70 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl"
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
                  "text-label-lg text-gray-700 mt-1",
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