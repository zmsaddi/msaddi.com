"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/components/ui/motion";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetailSpecsProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

export function ServiceDetailSpecs({ serviceKey }: ServiceDetailSpecsProps) {
  const t = useTranslations(`services-details.${serviceKey}.specs`);

  // Define spec configurations for each service type
  const specConfigs = {
    laserCutting: [
      { labelKey: "maxThickness", valueKey: "values.thickness" },
      { labelKey: "workArea", valueKey: "values.area" },
      { labelKey: "laserType", valueKey: "values.type" },
      { labelKey: "precision", valueKey: "values.precisionValue" },
      { labelKey: "materials", valueKey: "values.materialsList" },
    ],
    cncBending: [
      { labelKey: "bendingForce", valueKey: "values.force" },
      { labelKey: "workLength", valueKey: "values.length" },
      { labelKey: "maxThickness", valueKey: "values.thickness" },
      { labelKey: "precision", valueKey: "values.precisionValue" },
      { labelKey: "materials", valueKey: "values.materialsList" },
    ],
    flangingDishing: [
      { labelKey: "flangeAngle", valueKey: "values.angle" },
      { labelKey: "maxDiameter", valueKey: "values.diameter" },
      { labelKey: "thickness", valueKey: "values.thicknessValue" },
      { labelKey: "materials", valueKey: "values.materialsList" },
    ],
    customFabrication: [
      { labelKey: "services.cutting", isService: true },
      { labelKey: "services.bending", isService: true },
      { labelKey: "services.welding", isService: true },
      { labelKey: "services.finishing", isService: true },
      { labelKey: "services.assembly", isService: true },
    ],
  };

  const specs = specConfigs[serviceKey];
  const isCustomFab = serviceKey === "customFabrication";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section className="py-16 lg:py-24 bg-surface-white">
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

        <div className="max-w-4xl mx-auto">
          {isCustomFab ? (
            // Custom Fabrication: List of services with checkmarks
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={cn(
                    "flex items-center gap-3 p-5 rounded-xl",
                    "bg-surface border border-outline",
                    "hover:border-primary/30 hover:shadow-elevation-2",
                    "transition-all duration-300"
                  )}
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-responsive-base text-text-primary font-medium">
                    {t(spec.labelKey)}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            // Other Services: Key-Value specifications table
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={cn(
                "rounded-2xl overflow-hidden",
                "bg-surface border border-outline",
                "shadow-elevation-2"
              )}
            >
              {specs.map((spec, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={cn(
                    "grid grid-cols-1 md:grid-cols-2 gap-4",
                    "p-6",
                    index !== specs.length - 1 && "border-b border-divider",
                    "hover:bg-primary/5 transition-colors duration-300"
                  )}
                >
                  <div className="font-heading font-semibold text-responsive-base text-text-primary">
                    {t(spec.labelKey)}
                  </div>
                  <div className="text-responsive-base text-text-secondary md:text-end">
                    {'valueKey' in spec && t(spec.valueKey)}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
