"use client";

import { useTranslations } from "next-intl";
import { motion } from "@/components/ui/motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServiceDetailGalleryProps {
  serviceKey: "laserCutting" | "cncBending" | "flangingDishing" | "customFabrication";
}

export function ServiceDetailGallery({ serviceKey }: ServiceDetailGalleryProps) {
  const t = useTranslations(`services-details.${serviceKey}.gallery`);

  // Map service keys to demo image paths
  const serviceImages: Record<typeof serviceKey, string> = {
    laserCutting: "/images/demo/service-laser-cutting-demo.webp",
    cncBending: "/images/demo/service-cnc-bending-demo.webp",
    flangingDishing: "/images/demo/service-flanging-dishing-demo.webp",
    customFabrication: "/images/demo/service-custom-fabrication-demo.webp",
  };

  // For now, we have one image per service. This can be expanded to multiple images
  const galleryImages = [
    {
      src: serviceImages[serviceKey],
      alt: t("imageAlt"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "grid gap-6",
            galleryImages.length === 1
              ? "max-w-5xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={cn(
                "group relative overflow-hidden rounded-2xl",
                "border border-outline",
                "hover:shadow-elevation-3 hover:border-primary/30",
                "transition-all duration-300"
              )}
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={90}
                  className={cn(
                    "object-cover",
                    "transition-transform duration-500",
                    "group-hover:scale-105"
                  )}
                />

                {/* Gradient overlay on hover */}
                <div className={cn(
                  "absolute inset-0",
                  "bg-gradient-to-t from-secondary/60 via-transparent to-transparent",
                  "opacity-0 group-hover:opacity-100",
                  "transition-opacity duration-300"
                )} />
              </div>

              {/* Optional caption overlay */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 p-6",
                "transform translate-y-full group-hover:translate-y-0",
                "transition-transform duration-300"
              )}>
                <p className="text-white font-medium text-responsive-sm drop-shadow-lg">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
