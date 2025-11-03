import dynamic from 'next/dynamic';

/**
 * Dynamically imported WhatsApp Button
 *
 * Benefits:
 * - Reduces initial bundle by ~5KB
 * - Only loads after page is interactive
 * - Non-critical feature loaded last
 */
const WhatsAppButtonDynamic = dynamic(
  () => import('@/components/ui/whatsapp-button').then((mod) => mod.WhatsAppButton),
  {
    ssr: false, // WhatsApp button is client-side only
  }
);

export default WhatsAppButtonDynamic;
