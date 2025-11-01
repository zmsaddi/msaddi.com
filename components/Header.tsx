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
      setScrolled(latest > 50);
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
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8" role="navigation" aria-label={t('main_navigation')}>
        <div className="flex justify-between items-center h-20 lg:h-24">
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
              <div className={`transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'}`}>
                <Logo size="small" color={scrolled ? "light" : "light"} />
              </div>
              <div className={`hidden md:block ${scrolled || !scrolled ? 'text-white' : 'text-slate-900'}`}>
                <div className="text-xl font-bold tracking-tight">MSADDI</div>
                <div className="text-xs text-orange-500 font-medium">Metal Fabrication</div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={`/${locale}${link.href}`}
                  className={`relative px-4 py-2 font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? 'text-orange-500'
                      : scrolled
                      ? 'text-white hover:text-orange-500'
                      : 'text-white hover:text-orange-500'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
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
                className="relative inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg shadow-lg hover:shadow-orange-500/50 hover:shadow-2xl transition-all duration-300 hover:scale-105 group overflow-hidden"
              >
                <span className="relative z-10">{t('contact')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <svg
                  className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
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
            className={`lg:hidden p-2 rounded-md transition-colors ${
              scrolled ? 'text-white hover:bg-slate-800' : 'text-white hover:bg-slate-800/50'
            }`}
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
            className="lg:hidden pb-6 bg-slate-900/95 backdrop-blur-md rounded-b-2xl"
          >
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={`/${locale}${link.href}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 font-medium rounded-lg transition-all ${
                    isActive(link.href)
                      ? 'bg-orange-500 text-white'
                      : 'text-white hover:bg-slate-800'
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
                className="mt-2 px-4 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold rounded-lg text-center shadow-lg"
              >
                {t('contact')}
              </Link>

              {/* Mobile Language Switcher */}
              <div className="pt-4 mt-2 border-t border-slate-700">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
