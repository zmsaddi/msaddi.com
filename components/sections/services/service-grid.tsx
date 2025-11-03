"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "@/components/ui/motion";
import Link from "next/link";
import { Zap, Settings, Layers, Package, CheckCircle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServiceGrid() {
  const t = useTranslations("services.services");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const isRTL = locale === "ar";

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
      ],
      color: "from-primary to-accent",
      link: `/${locale}/services/laser-cutting`,
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
      color: "from-secondary to-primary",
      link: `/${locale}/services/cnc-bending`,
    },
    {
      id: "flanging",
      icon: Layers,
      title: t("flanging.title"),
      description: t("flanging.description"),
      applications: [
        t("flanging.applications.0"),
        t("flanging.applications.1"),
        t("flanging.applications.2"),
      ],
      color: "from-accent to-primary",
      link: `/${locale}/services/flanging-dishing`,
    },
    {
      id: "custom",
      icon: Package,
      title: t("customFabrication.title"),
      description: t("customFabrication.description"),
      process: [
        t("customFabrication.process.0"),
        t("customFabrication.process.1"),
        t("customFabrication.process.2"),
      ],
      color: "from-primary to-secondary",
      link: `/${locale}/services/custom-fabrication`,
    },
  ];

  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        {/* MD3 Grid: 2-3 columns with 20px/32px gap */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-md3 p-8 hover:shadow-elevation-3 transition-shadow"
              >
                <div className={`bg-gradient-to-r ${service.color} w-20 h-20 rounded-md-lg flex items-center justify-center mb-6`}>
                  <Icon className="h-10 w-10 text-white" />
                </div>

                <h3 className="text-headline-md font-heading font-bold mb-4 text-text-primary">{service.title}</h3>
                <p className="text-body-lg text-text-secondary mb-6">{service.description}</p>

                {service.features && (
                  <div>
                    <h4 className="font-semibold mb-3 text-text-primary">{t("labels.features")}</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-body-md text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.applications && (
                  <div>
                    <h4 className="font-semibold mb-3 text-text-primary">{t("labels.applications")}</h4>
                    <ul className="space-y-2">
                      {service.applications.map((app, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-body-md text-text-secondary">{app}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.process && (
                  <div>
                    <h4 className="font-semibold mb-3 text-text-primary">{t("labels.process")}</h4>
                    <ol className="space-y-2">
                      {service.process.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="bg-primary/10 text-primary w-6 h-6 rounded-full flex items-center justify-center text-label-lg font-bold flex-shrink-0 latin-numerals">
                            {idx + 1}
                          </span>
                          <span className="text-body-md text-text-secondary">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {/* Learn More Link */}
                <div className="mt-6 pt-6 border-t border-divider">
                  <Link
                    href={service.link}
                    className={cn(
                      "group inline-flex items-center gap-2",
                      "text-primary font-semibold text-responsive-base",
                      "hover:text-primary-hover transition-colors duration-200"
                    )}
                  >
                    {tCommon("buttons.learnMore")}
                    <ArrowRight className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      "group-hover:translate-x-1",
                      isRTL && "rotate-180 group-hover:-translate-x-1"
                    )} />
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