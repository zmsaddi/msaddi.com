'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('common');
  const params = useParams();
  const locale = params.locale as string;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">{t('company_name')}</h3>
            <p className="text-gray-300 text-sm">{t('slogan')}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('quick_links')}</h4>
            <nav className="flex flex-col space-y-2" aria-label={t('footer_navigation')}>
              <Link href={`/${locale}`} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                {t('home')}
              </Link>
              <Link href={`/${locale}/about`} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                {t('about')}
              </Link>
              <Link href={`/${locale}/services`} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                {t('services')}
              </Link>
              <Link href={`/${locale}/contact`} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                {t('contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('contact')}</h4>
            <address className="not-italic text-gray-300 text-sm space-y-2">
              <p>Email: <a href="mailto:info@msaddi.com" className="hover:text-blue-400 transition-colors">info@msaddi.com</a></p>
              <p>Riyadh, Saudi Arabia</p>
            </address>
          </div>

          {/* Social Links (placeholder) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">{t('follow_us')}</h4>
            <div className="flex gap-4">
              <a href="#" aria-label={t('facebook_link')} className="text-gray-300 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" aria-label={t('twitter_link')} className="text-gray-300 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" aria-label={t('linkedin_link')} className="text-gray-300 hover:text-blue-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} {t('company_name')}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
