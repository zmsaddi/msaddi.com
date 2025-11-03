"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  const t = useTranslations("home.cta");
  const locale = useLocale();

  return (
    <section className="section-padding bg-gradient-to-r from-metal-gray to-dark-base relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 laser-beam" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-responsive-3xl font-heading font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-responsive-lg text-light-neutral/90 mb-8">
            {t("subtitle")}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            {t("button")}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}