// Google Analytics tracking utilities
import { envPublic } from "@/lib/env-public";

export const GA_MEASUREMENT_ID = envPublic.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Types for Google Analytics events
type GTagEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

// Helper to check if gtag is available
export const isGtagAvailable = () => {
  return typeof window !== "undefined" && window.gtag;
};

// Track pageviews
export const pageview = (url: string) => {
  if (!isGtagAvailable() || !GA_MEASUREMENT_ID) return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const event = ({ action, category, label, value, ...otherParams }: GTagEvent) => {
  if (!isGtagAvailable()) return;

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
    ...otherParams,
  });
};

// Predefined events for MSADDI.EST

// Track form submissions
export const trackFormSubmission = (formType: string, success: boolean = true) => {
  event({
    action: "form_submit",
    category: "engagement",
    label: formType,
    value: success ? 1 : 0,
    form_type: formType,
    success: success,
  });
};

// Track quote requests
export const trackQuoteRequest = (service?: string) => {
  event({
    action: "generate_lead",
    category: "conversion",
    label: service || "general",
    value: 1,
    service_type: service,
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location?: string) => {
  event({
    action: "click",
    category: "engagement",
    label: buttonName,
    button_location: location,
  });
};

// Track service interest
export const trackServiceView = (serviceName: string) => {
  event({
    action: "view_item",
    category: "engagement",
    label: serviceName,
    item_name: serviceName,
    item_category: "services",
  });
};

// Track document downloads (if PDFs are added later)
export const trackDownload = (fileName: string, fileType: string = "pdf") => {
  event({
    action: "file_download",
    category: "engagement",
    label: fileName,
    file_name: fileName,
    file_type: fileType,
  });
};

// Track phone/WhatsApp clicks
export const trackContactClick = (contactType: "phone" | "whatsapp" | "email") => {
  event({
    action: "contact",
    category: "conversion",
    label: contactType,
    contact_method: contactType,
  });
};

// Track scroll depth (call at different scroll percentages)
export const trackScrollDepth = (percentage: number) => {
  event({
    action: "scroll",
    category: "engagement",
    label: `${percentage}%`,
    value: percentage,
    percent_scrolled: percentage,
  });
};

// Track time on page (call at intervals)
export const trackTimeOnPage = (seconds: number, pagePath: string) => {
  event({
    action: "time_on_page",
    category: "engagement",
    label: pagePath,
    value: seconds,
    page_path: pagePath,
  });
};

// Track language switches
export const trackLanguageChange = (fromLang: string, toLang: string) => {
  event({
    action: "language_change",
    category: "engagement",
    label: `${fromLang}_to_${toLang}`,
    from_language: fromLang,
    to_language: toLang,
  });
};

// Enhanced ecommerce tracking for quote value (if needed)
export const trackQuoteValue = (service: string, estimatedValue?: number) => {
  if (!isGtagAvailable()) return;

  window.gtag("event", "begin_checkout", {
    currency: "USD",
    value: estimatedValue || 0,
    items: [
      {
        item_name: service,
        item_category: "metal_fabrication",
        quantity: 1,
        price: estimatedValue || 0,
      },
    ],
  });
};