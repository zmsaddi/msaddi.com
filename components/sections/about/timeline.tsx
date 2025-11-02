"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function Timeline() {
  const t = useTranslations("about.timeline");

  const milestones = [
    { year: "1994", title: "Foundation", description: "MSADDI.EST established in Aleppo with a vision to revolutionize metal fabrication" },
    { year: "2005", title: "Expansion", description: "Major facility expansion and introduction of advanced laser cutting technology" },
    { year: "2015", title: "Innovation", description: "Implementation of state-of-the-art CNC machinery and quality management systems" },
    { year: "2020", title: "Excellence", description: "Achieved ISO certification and expanded services to international markets" },
    { year: "2024", title: "Future", description: "Continuing our legacy with cutting-edge technology and sustainable practices" },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-responsive-3xl font-heading font-bold text-center mb-12"
        >
          {t("title")}
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-gradient-to-b from-primary via-blue-500 to-primary/30" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                  <div className="ml-20 md:ml-0">
                    <div className="bg-white dark:bg-metal-gray/20 rounded-lg p-6 shadow-lg">
                      <span className="text-primary font-bold text-2xl">{milestone.year}</span>
                      <h3 className="text-xl font-heading font-semibold mt-2 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-metal-gray dark:text-silver-accent">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full" />
                    <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}