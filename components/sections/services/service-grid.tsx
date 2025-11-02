"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Zap, Settings, Layers, Package, CheckCircle } from "lucide-react";

export function ServiceGrid() {
  const t = useTranslations("services.services");

  const services = [
    {
      id: "laser",
      icon: Zap,
      title: t("laserCutting.title"),
      description: t("laserCutting.description"),
      features: [
        t("laserCutting.features.workSize"),
        t("laserCutting.features.materials"),
        t("laserCutting.features.thickness.steel"),
        t("laserCutting.features.thickness.aluminum"),
        t("laserCutting.features.thickness.copper"),
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "bending",
      icon: Settings,
      title: t("bending.title"),
      description: t("bending.description"),
      features: [
        t("bending.features.equipment"),
        t("bending.features.capacity"),
        t("bending.features.length"),
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "flanging",
      icon: Layers,
      title: t("flanging.title"),
      description: t("flanging.description"),
      applications: t("flanging.applications", { returnObjects: true }) as unknown as string[],
      color: "from-green-500 to-teal-500",
    },
    {
      id: "custom",
      icon: Package,
      title: t("customFabrication.title"),
      description: t("customFabrication.description"),
      process: t("customFabrication.process", { returnObjects: true }) as unknown as string[],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="section-padding bg-light-neutral dark:bg-dark-base">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-metal-gray/10 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${service.color} w-20 h-20 rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-2xl font-heading font-bold mb-4">{service.title}</h3>
                <p className="text-metal-gray dark:text-silver-accent mb-6">{service.description}</p>

                {service.features && (
                  <div>
                    <h4 className="font-semibold mb-3">{t("labels.features")}</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-metal-gray dark:text-light-neutral">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.applications && (
                  <div>
                    <h4 className="font-semibold mb-3">{t("labels.applications")}</h4>
                    <ul className="space-y-2">
                      {service.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-metal-gray dark:text-light-neutral">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.process && (
                  <div>
                    <h4 className="font-semibold mb-3">{t("labels.process")}</h4>
                    <ol className="space-y-2">
                      {service.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-metal-gray dark:text-light-neutral">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}