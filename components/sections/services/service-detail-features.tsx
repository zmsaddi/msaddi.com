"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Gauge, Settings, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetailFeaturesProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

// Icon mapping for features - can be customized per service
const featureIcons = {
  precision: Zap,
  capacity: Gauge,
  speed: Gauge,
  materials: Package,
  automation: Settings,
  flexibility: Settings,
  flanging: Zap,
  dishing: Zap,
  quality: Gauge,
  custom: Settings,
  design: Settings,
  manufacturing: Package,
  delivery: Gauge,
};

export function ServiceDetailFeatures({ serviceKey }: ServiceDetailFeaturesProps) {
  const t = useTranslations(`services-details.${serviceKey}.features`);

  // Get all feature keys dynamically from the translation namespace
  const featureKeys = ["precision", "capacity", "speed", "materials", "automation", "flexibility", "flanging", "dishing", "quality", "custom", "design", "manufacturing", "delivery"];

  // Filter to only include features that exist for this service
  const availableFeatures = featureKeys.filter((key) => {
    try {
      t(`items.${key}.title`);
      return true;
    } catch {
      return false;
    }
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-surface">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-responsive-3xl font-heading font-bold text-text-primary mb-4">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {availableFeatures.map((featureKey) => {
            const IconComponent = featureIcons[featureKey as keyof typeof featureIcons] || Package;

            return (
              <motion.div
                key={featureKey}
                variants={itemVariants}
                className={cn(
                  "group relative p-6 rounded-2xl",
                  "bg-surface-white border border-outline",
                  "hover:shadow-elevation-3 hover:border-primary/30",
                  "transition-all duration-300"
                )}
              >
                {/* Icon with gradient background */}
                <div className={cn(
                  "w-12 h-12 rounded-xl mb-4",
                  "bg-gradient-to-br from-primary/10 to-secondary/10",
                  "flex items-center justify-center",
                  "group-hover:from-primary/20 group-hover:to-secondary/20",
                  "transition-colors duration-300"
                )}>
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-responsive-lg font-heading font-semibold text-text-primary mb-2">
                  {t(`items.${featureKey}.title`)}
                </h3>
                <p className="text-responsive-sm text-text-secondary leading-relaxed">
                  {t(`items.${featureKey}.description`)}
                </p>

                {/* Subtle hover effect line */}
                <div className={cn(
                  "absolute bottom-0 left-6 right-6 h-0.5",
                  "bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300"
                )} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
