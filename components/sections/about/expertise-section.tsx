"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ExpertiseSection() {
  const t = useTranslations("about.expertise");

  const stats = [
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.projects"), label: t("stats.projectsLabel") },
    { value: t("stats.clients"), label: t("stats.clientsLabel") },
    { value: t("stats.team"), label: t("stats.teamLabel") },
  ];

  return (
    <section className="section-padding bg-gradient-to-r from-secondary to-secondary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-responsive-3xl font-heading font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-responsive-lg text-white/90 max-w-3xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-accent mb-2 latin-numerals">{stat.value}</div>
              <div className="text-white/80 text-body-md">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}