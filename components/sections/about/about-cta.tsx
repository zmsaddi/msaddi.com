"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutCTA() {
  const t = useTranslations("about.cta");
  const locale = useLocale();

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-responsive-3xl font-heading font-bold mb-4 text-text-primary">
            {t("title")}
          </h2>
          <p className="text-responsive-lg text-text-secondary mb-8">
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