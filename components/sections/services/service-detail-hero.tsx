"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

interface ServiceDetailHeroProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

export function ServiceDetailHero({ serviceKey }: ServiceDetailHeroProps) {
  const t = useTranslations(`services-details.${serviceKey}.hero`);

  // Map service keys to demo image paths
  const serviceImages: Record<typeof serviceKey, string> = {
    laserCutting: "/images/demo/service-laser-cutting-demo.webp",
    cncBending: "/images/demo/service-cnc-bending-demo.webp",
    flangingDishing: "/images/demo/service-flanging-dishing-demo.webp",
    customFabrication: "/images/demo/service-custom-fabrication-demo.webp",
  };

  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Service background image with MD3 overlay */}
      <div className="absolute inset-0">
        <Image
          src={serviceImages[serviceKey]}
          alt={t("title")}
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/70 via-secondary/60 to-primary/60" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-responsive-4xl font-heading font-bold mb-4 text-white"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-responsive-xl text-white/95 font-semibold mb-6"
          >
            {t("subtitle")}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-responsive-lg text-white/90"
          >
            {t("description")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
