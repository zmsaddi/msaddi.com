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
          <h2 className="text-responsive-3xl font-heading font-bold text-center mb-4 text-text-primary">
            {t("intro.title")}
          </h2>
          <p className="text-responsive-base text-text-secondary text-center">
            {t("intro.description")}
          </p>
        </motion.div>

        {/* MD3 Two-column layout with 20px/32px gap */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-md3 p-8"
          >
            <div className="bg-primary w-16 h-16 rounded-md-lg flex items-center justify-center mb-6">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-headline-md font-heading font-bold mb-4 text-text-primary">{t("mission.title")}</h3>
            <p className="text-body-lg text-text-secondary">
              {t("mission.description")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-md3 p-8"
          >
            <div className="bg-accent w-16 h-16 rounded-md-lg flex items-center justify-center mb-6">
              <Eye className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-headline-md font-heading font-bold mb-4 text-text-primary">{t("vision.title")}</h3>
            <p className="text-body-lg text-text-secondary">
              {t("vision.description")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}