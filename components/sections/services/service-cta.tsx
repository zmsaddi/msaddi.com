"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { motion } from "@/components/ui/motion";
import { ArrowRight } from "lucide-react";

export function ServiceCTA() {
  const t = useTranslations("services.cta");
  const locale = useLocale();

  return (
    <section className="section-padding bg-gradient-to-r from-metal-gray to-dark-base">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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