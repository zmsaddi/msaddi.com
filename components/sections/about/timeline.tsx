"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Timeline() {
  const t = useTranslations("about.timeline");
  const locale = useLocale();
  const _isRTL = locale === "ar";

  const milestones = [
    { year: t("milestones.0.year"), title: t("milestones.0.title"), description: t("milestones.0.description") },
    { year: t("milestones.1.year"), title: t("milestones.1.title"), description: t("milestones.1.description") },
    { year: t("milestones.2.year"), title: t("milestones.2.title"), description: t("milestones.2.description") },
    { year: t("milestones.3.year"), title: t("milestones.3.title"), description: t("milestones.3.description") },
    { year: t("milestones.4.year"), title: t("milestones.4.title"), description: t("milestones.4.description") },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-responsive-3xl font-heading font-bold text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className={cn(
              "absolute h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30",
              "ltr:left-8 rtl:right-8 md:left-1/2 md:right-auto transform md:-translate-x-px"
            )} />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={cn(
                  "flex-1",
                  index % 2 === 0
                    ? "md:pr-12 md:rtl:pr-0 md:rtl:pl-12 md:text-right md:rtl:text-left"
                    : "md:pl-12 md:rtl:pl-0 md:rtl:pr-12"
                )}>
                  <div className="ltr:ml-20 rtl:mr-20 md:ltr:ml-0 md:rtl:mr-0">
                    <div className="card-md3 p-6">
                      <span className="text-primary font-bold text-headline-sm latin-numerals">{milestone.year}</span>
                      <h3 className="text-title-lg font-heading font-semibold mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-body-md text-text-secondary">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className={cn(
                  "absolute flex items-center justify-center",
                  "ltr:left-8 rtl:right-8 md:left-1/2 md:right-auto transform -translate-x-1/2"
                )}>
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                    <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}