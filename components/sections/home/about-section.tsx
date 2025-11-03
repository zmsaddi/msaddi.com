"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "@/components/ui/motion";
import { CheckCircle } from "lucide-react";

export function AboutSection() {
  const t = useTranslations("home.about");
  const tCommon = useTranslations("common.placeholders");
  const locale = useLocale();

  const features = [
    t("features.quality"),
    t("features.technology"),
    t("features.team"),
    t("features.delivery"),
  ];

  return (
    <section className="section-padding bg-light-neutral dark:bg-metal-gray/10">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-metal-gray/20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 metal-shine opacity-30" />
              {/* Placeholder for workshop image */}
              <div className="flex items-center justify-center h-full text-metal-gray/50">
                <span className="text-lg">{tCommon("workshopImage")}</span>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-responsive-3xl font-heading font-bold mb-4">
              {t("title")}
            </h2>
            <h3 className="text-responsive-lg text-primary mb-6">
              {t("subtitle")}
            </h3>
            <p className="text-metal-gray dark:text-silver-accent mb-8">
              {t("description")}
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-metal-gray dark:text-light-neutral">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <Link href={`/${locale}/about`} className="btn-primary inline-flex">
              {t("cta")}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}