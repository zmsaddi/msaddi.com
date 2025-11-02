"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { trackContactClick } from "@/lib/gtag";

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const tHours = useTranslations("contact.hours");

  const contactItems = [
    {
      icon: Mail,
      label: t("items.email.label"),
      value: "info@msaddi.com",
      href: "mailto:info@msaddi.com",
      trackingType: "email" as const,
    },
    {
      icon: Phone,
      label: t("items.phone.label"),
      value: "+963 944 244 604",
      href: "tel:+963944244604",
      trackingType: "phone" as const,
    },
    {
      icon: MessageCircle,
      label: t("items.whatsapp.label"),
      value: "+963 944 244 604",
      href: "https://wa.me/963944244604",
      trackingType: "whatsapp" as const,
    },
    {
      icon: MapPin,
      label: t("items.address.label"),
      value: t("items.address.value"),
      href: "https://maps.app.goo.gl/QYUZ6pu1xHxtaPD59",
      trackingType: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="bg-white dark:bg-metal-gray/10 rounded-xl p-8 shadow-lg">
        <h3 className="text-2xl font-heading font-bold mb-6">{t("title")}</h3>
        <div className="space-y-4">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => {
                  if (item.trackingType) {
                    trackContactClick(item.trackingType);
                  }
                }}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-light-neutral dark:hover:bg-metal-gray/20 transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-metal-gray dark:text-silver-accent">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/5 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-heading font-bold">{tHours("title")}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{tHours("days.weekdays")}</span>
            <span className="text-metal-gray dark:text-silver-accent">
              {tHours("times.weekdays")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{tHours("days.weekend")}</span>
            <span className="text-metal-gray dark:text-silver-accent">
              {tHours("times.weekend")}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
        <MessageCircle className="h-12 w-12 mx-auto mb-3" />
        <h4 className="font-heading font-semibold mb-2">Chat on WhatsApp</h4>
        <p className="text-sm mb-4">Quick response guaranteed</p>
        <a
          href="https://wa.me/963944244604"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("whatsapp")}
          className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:shadow-lg transition-all"
        >
          Start Chat
        </a>
      </div>
    </div>
  );
}