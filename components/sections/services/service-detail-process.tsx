"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface ServiceDetailProcessProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

export function ServiceDetailProcess({ serviceKey }: ServiceDetailProcessProps) {
  const t = useTranslations(`services-details.${serviceKey}`);
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Check if process section exists (EN/TR only)
  let hasProcess = false;
  try {
    t("process.title");
    hasProcess = true;
  } catch {
    hasProcess = false;
  }

  // If no process section, don't render anything
  if (!hasProcess) {
    return null;
  }

  // Get process steps dynamically
  const stepKeys = ["design", "optimization", "cutting", "bending", "inspection", "delivery", "prototyping", "production", "welding", "finishing", "assembly", "consultation", "engineering", "manufacturing", "testing"];

  const availableSteps = stepKeys.filter((key) => {
    try {
      t(`process.steps.${key}.title`);
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
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isRTL ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
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
          className="text-center mb-4"
        >
          <h2 className="text-responsive-3xl font-heading font-bold text-text-primary mb-4">
            {t("process.title")}
          </h2>
          <p className="text-responsive-base text-text-secondary max-w-2xl mx-auto">
            {t("process.description")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mt-12"
        >
          {availableSteps.map((stepKey, index) => (
            <motion.div
              key={stepKey}
              variants={itemVariants}
              className="relative"
            >
              {/* Step Card */}
              <div className={cn(
                "flex gap-6 items-start p-6 rounded-2xl mb-6",
                "bg-surface-white border border-outline",
                "hover:shadow-elevation-3 hover:border-primary/30",
                "transition-all duration-300"
              )}>
                {/* Step Number */}
                <div className={cn(
                  "flex-shrink-0 w-12 h-12 rounded-xl",
                  "bg-gradient-to-br from-primary to-secondary",
                  "flex items-center justify-center",
                  "text-white font-heading font-bold text-lg",
                  "shadow-elevation-2"
                )}>
                  {index + 1}
                </div>

                {/* Step Content */}
                <div className="flex-1 pt-1">
                  <h3 className="text-responsive-xl font-heading font-semibold text-text-primary mb-2">
                    {t(`process.steps.${stepKey}.title`)}
                  </h3>
                  <p className="text-responsive-base text-text-secondary leading-relaxed">
                    {t(`process.steps.${stepKey}.description`)}
                  </p>
                </div>
              </div>

              {/* Connecting Arrow (not on last item) */}
              {index < availableSteps.length - 1 && (
                <div className={cn(
                  "flex justify-center mb-6",
                  isRTL && "rotate-180"
                )}>
                  <ArrowRight className="w-6 h-6 text-primary/40" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
