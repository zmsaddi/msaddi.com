"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Settings, Layers, Package } from "lucide-react";

export function ServicesSection() {
  const t = useTranslations("home.services");
  const tServices = useTranslations("services.services");
  const locale = useLocale();

  // Only 3 service cards as per MD3 specifications
  const services = [
    {
      icon: Zap,
      title: tServices("laserCutting.title"),
      description: tServices("laserCutting.description")
    },
    {
      icon: Settings,
      title: tServices("bending.title"),
      description: tServices("bending.description")
    },
    {
      icon: Layers,
      title: tServices("flanging.title"),
      description: tServices("flanging.description")
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-responsive-3xl font-heading font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-responsive-lg text-text-secondary">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Grid Gap: 32px (Desktop) / 20px (Mobile) as per MD3 specs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="card-md3 p-6 h-full group-hover:shadow-elevation-3 transition-all duration-300">
                  <div className="bg-primary/10 w-16 h-16 rounded-md-lg flex items-center justify-center mb-4 group-hover:bg-primary transition-all duration-300">
                    <Icon className="h-8 w-8 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-title-lg font-heading font-semibold mb-3 text-text-primary">
                    {service.title}
                  </h3>
                  <p className="text-body-md text-text-secondary mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  <Link
                    href={`/${locale}/services`}
                    className="inline-flex items-center gap-1 text-primary font-medium text-body-sm hover:gap-2 transition-all duration-200"
                  >
                    {t("learnMore")} →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}