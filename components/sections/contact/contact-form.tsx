"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "@/components/ui/motion";
import { Send, Loader2, Paperclip, X } from "lucide-react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { envPublic } from "@/lib/env-public";
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
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>("");
  const { executeRecaptcha} = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileError("");

    if (!file) {
      setAttachedFile(null);
      return;
    }

    // Validate file size (max 20MB)
    const maxSize = 20 * 1024 * 1024; // 20MB in bytes
    if (file.size > maxSize) {
      setFileError("File size must be less than 20MB");
      setAttachedFile(null);
      e.target.value = "";
      return;
    }

    // Validate file type - accept all common engineering and document files
    const allowedTypes = [
      // Images
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/bmp', 'image/tiff', 'image/svg+xml',
      // Documents
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOC, DOCX
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS, XLSX
      'text/csv', 'application/vnd.ms-excel', // CSV
      // Compressed files
      'application/zip', 'application/x-zip-compressed',
      'application/x-rar-compressed', 'application/vnd.rar',
      'application/x-7z-compressed',
      // Text files
      'text/plain',
      // CAD files - AutoCAD
      'application/dxf', 'image/vnd.dxf', 'image/x-dxf',
      'application/dwg', 'image/vnd.dwg', 'application/acad',
      // CAD files - SolidWorks
      'application/sldprt', 'application/vnd.solidworks.part',
      'application/sldasm', 'application/vnd.solidworks.assembly',
      'application/slddrw', 'application/vnd.solidworks.drawing',
      // CAD files - Inventor
      'application/vnd.autodesk.inventor.part',
      'application/vnd.autodesk.inventor.assembly',
      'application/vnd.autodesk.inventor.drawing',
      // CAD files - STEP/IGES
      'application/step', 'application/stp',
      'application/iges', 'application/igs',
      // CAD files - 3D formats
      'model/stl', 'application/sla', 'application/vnd.ms-pki.stl',
      'application/x-step', 'application/x-iges',
    ];

    // Also check file extension for CAD files (since MIME types vary)
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const allowedExtensions = [
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff', 'svg',
      'pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt',
      'zip', 'rar', '7z',
      'dwg', 'dxf', 'dwf',
      'sldprt', 'sldasm', 'slddrw',
      'ipt', 'iam', 'idw',
      'step', 'stp', 'iges', 'igs',
      'stl', 'x_t', 'x_b', 'sat'
    ];

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension || '')) {
      setFileError("File type not supported. Please upload images, PDF, documents, CAD files, or compressed archives.");
      setAttachedFile(null);
      e.target.value = "";
      return;
    }

    setAttachedFile(file);
  };

  const removeFile = () => {
    setAttachedFile(null);
    setFileError("");
  };

  const onSubmit = async (data: FormData) => {
    if (!executeRecaptcha) {
      console.error("reCAPTCHA not ready");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const token = await executeRecaptcha("contact_form");

      // Use FormData to support file uploads
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      formData.append('subject', data.subject);
      formData.append('message', data.message);
      formData.append('recaptchaToken', token);
      formData.append('locale', locale);

      if (attachedFile) {
        formData.append('attachment', attachedFile);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setAttachedFile(null);
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
    <div className="card-md3 p-8">
      <h3 className="text-headline-md font-heading font-bold mb-2 text-text-primary">{t("title")}</h3>
      <p className="text-body-lg text-text-secondary mb-6">{t("subtitle")}</p>

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

        <div>
          <label className="block text-sm font-medium mb-2">
            <Paperclip className="inline h-4 w-4 mr-1" />
            Attachment (Optional)
          </label>
          <div className="space-y-2">
            {!attachedFile ? (
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png,.gif,.webp,.bmp,.tiff,.svg,.zip,.rar,.7z,.txt,.dwg,.dxf,.dwf,.sldprt,.sldasm,.slddrw,.ipt,.iam,.idw,.step,.stp,.iges,.igs,.stl,.x_t,.x_b,.sat"
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary hover:bg-surface-hover transition-colors"
                >
                  <Paperclip className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Click to upload file (Max 20MB)
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-surface-light dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <Paperclip className="h-5 w-5 text-primary" />
                <span className="flex-1 text-sm truncate">{attachedFile.name}</span>
                <span className="text-xs text-gray-500">
                  {(attachedFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            {fileError && (
              <p className="text-red-500 text-sm">{fileError}</p>
            )}
            <p className="text-xs text-gray-500">
              Supported: Images, PDF, Word, Excel, CSV, CAD files (AutoCAD, SolidWorks, Inventor, STEP, IGES, STL), Archives - Max 20MB
            </p>
          </div>
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
  return (
    <GoogleReCaptchaProvider reCaptchaKey={envPublic.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
      <ContactFormContent />
    </GoogleReCaptchaProvider>
  );
}