"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";

export function MissionVision() {
  const t = useTranslations("about");

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-16"
        >
          <h2 className="text-responsive-3xl font-heading font-bold text-center mb-4">
            {t("intro.title")}
          </h2>
          <p className="text-responsive-base text-metal-gray dark:text-silver-accent text-center">
            {t("intro.description")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-xl p-8"
          >
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4">{t("mission.title")}</h3>
            <p className="text-metal-gray dark:text-silver-accent">
              {t("mission.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-xl p-8"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-4">{t("vision.title")}</h3>
            <p className="text-metal-gray dark:text-silver-accent">
              {t("vision.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}