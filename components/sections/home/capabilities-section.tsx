"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function CapabilitiesSection() {
  const t = useTranslations("capabilities");

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Metal gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-metal-gray via-silver-accent to-metal-light opacity-10" />
      <div className="absolute inset-0 metal-shine" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-responsive-3xl font-heading font-bold mb-4 gradient-text">
            {t("title")}
          </h2>
          <h3 className="text-responsive-xl text-metal-gray dark:text-light-neutral mb-6">
            {t("subtitle")}
          </h3>
          <p className="text-responsive-base text-metal-gray dark:text-silver-accent">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}