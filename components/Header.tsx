'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

export default function Header() {
  const t = useTranslations('common');
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale as string;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Handle scroll effect
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 20);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isActive = (path: string) => pathname === `/${locale}${path}`;

  const navLinks = [
    { href: '', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/products', label: t('products') },
    { href: '/capabilities', label: t('capabilities') },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-lg'
          : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8" role="navigation" aria-label={t('main_navigation')}>
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link
              href={`/${locale}`}
              aria-label={t('company_name')}
              className="flex items-center space-x-3 rtl:space-x-reverse group"
            >
              <div className="transition-all duration-300">
                <Logo size="small" color="dark" />
              </div>
              <div className="hidden md:block">
                <div className="text-xl font-bold tracking-tight text-slate-900">MSADDI</div>
                <div className="text-xs text-orange-600 font-semibold">Metal Fabrication</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={`/${locale}${link.href}`}
                  className={`relative px-4 py-2 font-semibold transition-all duration-200 rounded-lg ${
                    isActive(link.href)
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-slate-700 hover:text-orange-600 hover:bg-slate-50'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Language Switcher */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="ml-2"
            >
              <LanguageSwitcher />
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="ml-4"
            >
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-300 hover:scale-105"
              >
                {t('contact')}
                <svg
                  className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label={t('toggle_menu')}
            aria-expanded={mobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 border-t border-slate-200 mt-2"
          >
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 font-semibold rounded-lg transition-all ${
                    isActive(link.href)
                      ? 'bg-orange-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile CTA */}
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg text-center shadow-md"
              >
                {t('contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-3 mt-2 border-t border-slate-200">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
