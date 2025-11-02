"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function MapSection() {
  const t = useTranslations("contact.map");

  return (
    <section className="section-padding bg-light-neutral dark:bg-metal-gray/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-responsive-3xl font-heading font-bold mb-4">{t("title")}</h2>
          <p className="text-responsive-lg text-metal-gray dark:text-silver-accent">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-dark-base rounded-xl overflow-hidden shadow-xl"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3259.8667685051346!2d37.1588!3d36.2084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDEyJzMwLjIiTiAzN8KwMDknMzEuNyJF!5e0!3m2!1sen!2s!4v1635959120000!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}