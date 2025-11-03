"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { motion } from "@/components/ui/motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trackButtonClick } from "@/lib/gtag";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const features = [
    t("stats.years") + " " + t("stats.yearsLabel"),
    t("stats.projects") + " " + t("stats.projectsLabel"),
    t("stats.satisfaction") + " " + t("stats.satisfactionLabel"),
  ];

  const stats = [
    { valueKey: "stats.cuttingArea", labelKey: "stats.cuttingAreaLabel", unit: "mm" },
    { valueKey: "stats.bendingForce", labelKey: "stats.bendingForceLabel", unit: "" },
    { valueKey: "stats.satisfaction", labelKey: "stats.satisfactionLabel", unit: "" },
    { valueKey: "stats.projects", labelKey: "stats.projectsLabel", unit: "" },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Industrial background image with overlay - Material Design 3 - OPTIMIZED */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-metal-workshop.jpg"
          alt="MSADDI Metal Fabrication Workshop - Professional Laser Cutting Services Aleppo Syria"
          fill
          quality={70}
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/50 to-primary/55" />
      </div>

      {/* ⚡ MOBILE-OPTIMIZED: Responsive container and spacing */}
      <div className="container-custom pt-32 sm:pt-40 lg:pt-48 pb-12 sm:pb-16 lg:pb-20 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Text Content Card - 70% Transparent - MOBILE-OPTIMIZED */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl"
          >
            {/* ⚡ MOBILE-OPTIMIZED: Responsive heading using text-responsive utility */}
            <h1 className="text-responsive-4xl font-heading font-bold text-text-primary mb-4 sm:mb-6">
              {t("title")}
              <span className="block text-accent mt-2">
                {t("subtitle")}
              </span>
            </h1>

            {/* ⚡ MOBILE-OPTIMIZED: Responsive description */}
            <p className="text-responsive-base text-text-secondary mb-6 sm:mb-8 max-w-xl leading-relaxed">
              {t("description")}
            </p>

            {/* Features List - Mobile-optimized spacing */}
            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-12">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-responsive-base text-text-primary">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Material Design 3 Extended FAB Button - Touch-friendly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link
                href={`/${locale}/contact`}
                onClick={() => trackButtonClick("hero_cta_primary")}
                className="btn-fab-extended inline-flex min-h-[48px]"
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

        {/* Bottom stats bar Card - 70% Transparent - MOBILE-OPTIMIZED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-12 sm:mt-16 lg:mt-24 bg-white/70 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-responsive-3xl font-bold text-accent latin-numerals">
                  {t(stat.valueKey)}
                  {stat.unit && <span className="text-responsive-base font-normal">{stat.unit}</span>}
                </p>
                <p className="text-responsive-sm text-text-secondary mt-1">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}