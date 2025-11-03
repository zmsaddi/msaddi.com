"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/components/ui/motion";
import Image from "next/image";

export function ContactHero() {
  const t = useTranslations("contact.page");

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Industrial background with MD3 overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-metal-workshop.jpg"
          alt="Contact MSADDI - Professional Metal Fabrication Services Aleppo Syria"
          fill
          quality={75}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/60 via-secondary/50 to-primary/55" />
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
          <h2 className="text-responsive-xl text-white/90 mb-4">
            {t("subtitle")}
          </h2>
          <p className="text-responsive-base text-white/80">
            {t("description")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}