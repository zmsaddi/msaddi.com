"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { trackContactClick } from "@/lib/gtag";

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const tHours = useTranslations("contact.hours");
  const tCommon = useTranslations("common.whatsapp");

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
      href: `https://wa.me/963944244604?text=${encodeURIComponent(tCommon("message"))}`,
      trackingType: "whatsapp" as const,
    },
    {
      icon: MapPin,
      label: t("items.address.label"),
      value: t("items.address.value"),
      href: "https://www.google.com/maps?q=36.25730305,37.16812130",
      trackingType: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Contact Info */}
      <div className="card-md3 p-8">
        <h3 className="text-headline-md font-heading font-bold mb-6 text-text-primary">{t("title")}</h3>
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
                className="flex items-start gap-4 p-3 rounded-md-md hover:bg-surface transition-colors"
              >
                <div className="bg-primary/10 p-2 rounded-md-sm">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-label-lg text-text-secondary">{item.label}</p>
                  <p className="font-medium text-text-primary latin-numerals" dir="ltr">{item.value}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Business Hours */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-md-lg p-8 border border-outline">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-primary" />
          <h3 className="text-title-lg font-heading font-bold text-text-primary">{tHours("title")}</h3>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium text-text-primary">{tHours("days.weekdays")}</span>
            <span className="text-text-secondary latin-numerals" dir="ltr">
              {tHours("times.weekdays")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-text-primary">{tHours("days.weekend")}</span>
            <span className="text-text-secondary">
              {tHours("times.weekend")}
            </span>
          </div>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
        <MessageCircle className="h-12 w-12 mx-auto mb-3" />
        <h4 className="font-heading font-semibold mb-2">{tCommon("label")}</h4>
        <p className="text-sm mb-4">{tCommon("quickResponse")}</p>
        <a
          href={`https://wa.me/963944244604?text=${encodeURIComponent(tCommon("message"))}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContactClick("whatsapp")}
          className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-2 rounded-md font-semibold hover:shadow-lg transition-all"
        >
          {tCommon("chatNow")}
        </a>
      </div>
    </div>
  );
}