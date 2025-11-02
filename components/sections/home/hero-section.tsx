"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, Users } from "lucide-react";
import { trackButtonClick } from "@/lib/gtag";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const stats = [
    { icon: Clock, value: t("stats.years"), label: t("stats.yearsLabel") },
    { icon: Award, value: t("stats.projects"), label: t("stats.projectsLabel") },
    { icon: Users, value: t("stats.satisfaction"), label: t("stats.satisfactionLabel") },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-base via-metal-gray/20 to-primary/10 dark:from-dark-base dark:via-dark-base dark:to-primary/5" />

      {/* Animated Metal Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 metal-shine" />
      </div>

      {/* Laser Beam Effect */}
      <div className="absolute top-1/2 left-0 right-0 h-1 laser-beam" />

      <div className="container-custom relative z-10 pt-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-responsive-4xl font-heading font-bold mb-4"
          >
            <span className="gradient-text">{t("title")}</span>
            <br />
            <span className="text-metal-gray dark:text-light-neutral">{t("subtitle")}</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-responsive-lg text-metal-gray dark:text-silver-accent mb-8"
          >
            {t("description")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Link
              href={`/${locale}/contact`}
              onClick={() => trackButtonClick("hero_request_quote", "hero")}
              className="btn-primary flex items-center justify-center gap-2"
            >
              {t("cta1")}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={`/${locale}/services`}
              onClick={() => trackButtonClick("hero_view_services", "hero")}
              className="btn-secondary"
            >
              {t("cta2")}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="bg-white/80 dark:bg-metal-gray/20 backdrop-blur-sm rounded-lg p-6 border border-metal-light/20"
                >
                  <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-metal-gray dark:text-light-neutral mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-metal-gray dark:text-silver-accent">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}