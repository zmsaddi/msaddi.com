"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "@/components/ui/motion";
import Link from "next/link";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetailCTAProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

export function ServiceDetailCTA({ serviceKey }: ServiceDetailCTAProps) {
  const t = useTranslations(`services-details.${serviceKey}.cta`);
  const tContact = useTranslations("contact.info");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative overflow-hidden rounded-3xl",
            "bg-gradient-to-br from-primary to-secondary",
            "shadow-elevation-3",
            "p-8 lg:p-12"
          )}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-responsive-3xl font-heading font-bold text-white mb-4"
            >
              {t("title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-responsive-lg text-white/90 mb-8"
            >
              {t("description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              {/* Primary CTA Button */}
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  "group inline-flex items-center gap-2 px-8 py-4",
                  "bg-white text-primary rounded-xl",
                  "font-heading font-semibold text-responsive-base",
                  "hover:bg-white/95 hover:shadow-elevation-3",
                  "transition-all duration-300",
                  "shadow-elevation-2"
                )}
              >
                {t("button")}
                <ArrowRight className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  "group-hover:translate-x-1",
                  isRTL && "rotate-180 group-hover:-translate-x-1"
                )} />
              </Link>

              {/* Secondary Contact Options */}
              <div className="flex items-center gap-4">
                <a
                  href={`tel:${tContact("phone")}`}
                  className={cn(
                    "group inline-flex items-center gap-2 px-6 py-4",
                    "bg-white/10 text-white rounded-xl border border-white/20",
                    "font-medium text-responsive-sm",
                    "hover:bg-white/20 hover:border-white/30",
                    "transition-all duration-300"
                  )}
                  aria-label={tContact("phone")}
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">{tContact("phone")}</span>
                </a>

                <a
                  href={`mailto:${tContact("email")}`}
                  className={cn(
                    "group inline-flex items-center gap-2 px-6 py-4",
                    "bg-white/10 text-white rounded-xl border border-white/20",
                    "font-medium text-responsive-sm",
                    "hover:bg-white/20 hover:border-white/30",
                    "transition-all duration-300"
                  )}
                  aria-label={tContact("email")}
                >
                  <Mail className="w-4 h-4" />
                  <span className="hidden sm:inline">{tContact("email")}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
