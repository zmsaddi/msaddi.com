"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Lightbulb, Shield } from "lucide-react";

export function ValuesSection() {
  const t = useTranslations("about.values");

  // Limited to 3 values as per MD3 specifications
  const values = [
    {
      icon: Award,
      title: t("items.quality.title"),
      description: t("items.quality.description"),
      color: "from-primary to-accent",
    },
    {
      icon: Lightbulb,
      title: t("items.innovation.title"),
      description: t("items.innovation.description"),
      color: "from-accent to-primary",
    },
    {
      icon: Shield,
      title: t("items.integrity.title"),
      description: t("items.integrity.description"),
      color: "from-primary to-primary-dark",
    },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-responsive-3xl font-heading font-bold text-center mb-12 text-text-primary"
        >
          {t("title")}
        </motion.h2>

        {/* MD3 Three-column layout with 20px/32px gap */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-md3 p-8 hover:shadow-elevation-3 transition-shadow"
              >
                <div className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-md-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-title-lg font-heading font-semibold mb-3 text-text-primary">{value.title}</h3>
                <p className="text-body-md text-text-secondary">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}