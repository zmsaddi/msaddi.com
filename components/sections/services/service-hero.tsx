"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ServiceHero() {
  const t = useTranslations("services.page");

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Industrial background with MD3 overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/msaddi-services-industrial-workshop.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 via-secondary/85 to-primary/80" />
      </div>

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
          <p className="text-responsive-lg text-white/90 mb-4">
            {t("subtitle")}
          </p>
          <p className="text-responsive-base text-white/80">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}