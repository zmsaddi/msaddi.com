"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { trackFormSubmission, trackQuoteRequest } from "@/lib/gtag";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type FormData = z.infer<typeof formSchema>;

function ContactFormContent() {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const token = await executeRecaptcha("contact_form");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken: token }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        // Track successful form submission
        trackFormSubmission("contact", true);
        trackQuoteRequest(data.subject);
      } else {
        setSubmitStatus("error");
        // Track failed form submission
        trackFormSubmission("contact", false);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-metal-gray/10 rounded-xl p-8 shadow-lg">
      <h3 className="text-2xl font-heading font-bold mb-2">{t("title")}</h3>
      <p className="text-metal-gray dark:text-silver-accent mb-6">{t("subtitle")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t("fields.name.label")}</label>
            <input
              {...register("name")}
              className="input-field"
              placeholder={t("fields.name.placeholder")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("fields.email.label")}</label>
            <input
              {...register("email")}
              type="email"
              className="input-field"
              placeholder={t("fields.email.placeholder")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">{t("fields.phone.label")}</label>
            <input
              {...register("phone")}
              type="tel"
              className="input-field"
              placeholder={t("fields.phone.placeholder")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t("fields.subject.label")}</label>
            <input
              {...register("subject")}
              className="input-field"
              placeholder={t("fields.subject.placeholder")}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("fields.message.label")}</label>
          <textarea
            {...register("message")}
            rows={5}
            className="input-field resize-none"
            placeholder={t("fields.message.placeholder")}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 dark:bg-green-900/20 border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 rounded"
          >
            <p className="font-semibold">{t("success.title")}</p>
            <p className="text-sm">{t("success.description")}</p>
          </motion.div>
        )}

        {submitStatus === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/20 border border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded"
          >
            <p className="font-semibold">{t("error.title")}</p>
            <p className="text-sm">{t("error.description")}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              {t("submit")}
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  return (
    <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}