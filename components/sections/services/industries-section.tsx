"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/components/ui/motion";
import { Factory, Building2, Tractor, Truck, Cpu, Zap } from "lucide-react";

export function IndustriesSection() {
  const t = useTranslations("services.industries");

  const industries = [
    { icon: Factory, name: t("list.0"), color: "from-amber-500 to-orange-500" },
    { icon: Building2, name: t("list.1"), color: "from-gray-500 to-slate-500" },
    { icon: Tractor, name: t("list.2"), color: "from-green-500 to-emerald-500" },
    { icon: Truck, name: t("list.3"), color: "from-blue-500 to-indigo-500" },
    { icon: Cpu, name: t("list.4"), color: "from-purple-500 to-violet-500" },
    { icon: Zap, name: t("list.5"), color: "from-yellow-500 to-red-500" },
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
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-metal-gray/10 rounded-lg p-6 text-center hover:shadow-xl transition-all duration-300 h-full">
                  <div className={`bg-gradient-to-r ${industry.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm">{industry.name}</h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}