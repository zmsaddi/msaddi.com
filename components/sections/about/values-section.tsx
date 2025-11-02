"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Lightbulb, Shield, HardHat } from "lucide-react";

export function ValuesSection() {
  const t = useTranslations("about.values");

  const values = [
    {
      icon: Award,
      title: t("items.quality.title"),
      description: t("items.quality.description"),
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Lightbulb,
      title: t("items.innovation.title"),
      description: t("items.innovation.description"),
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: t("items.integrity.title"),
      description: t("items.integrity.description"),
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: HardHat,
      title: t("items.safety.title"),
      description: t("items.safety.description"),
      color: "from-red-500 to-pink-500",
    },
  ];

  return (
    <section className="section-padding bg-light-neutral dark:bg-metal-gray/10">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-responsive-3xl font-heading font-bold text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-dark-base rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${value.color} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-metal-gray dark:text-silver-accent">
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