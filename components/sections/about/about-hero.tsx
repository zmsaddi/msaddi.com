"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function AboutHero() {
  const t = useTranslations("about.page");

  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-br from-dark-base via-metal-gray/30 to-primary/20">
      <div className="absolute inset-0 metal-shine opacity-10" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-responsive-4xl font-heading font-bold mb-6 text-white">
            {t("title")}
          </h1>
          <p className="text-responsive-xl text-light-neutral/90 font-semibold">
            {t("subtitle")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}