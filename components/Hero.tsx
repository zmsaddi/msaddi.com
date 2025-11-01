'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface HeroProps {
  locale: string;
}

export default function Hero({ locale }: HeroProps) {
  const t = useTranslations('home');

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder - will be replaced with actual industrial photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=2940)',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Charcoal Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#23282A]/95 via-[#1A1A1A]/90 to-[#2A2A2A]/95" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          {/* Small overline text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-[#F2A900]/20 border border-[#F2A900]/30 rounded-full text-[#F2A900] font-semibold text-sm tracking-wide uppercase backdrop-blur-sm">
              {t('hero.badge', { default: 'Excellence in Metal Fabrication' })}
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            {t('hero.title', { default: 'Precision Metal Fabrication Solutions' })}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-3xl"
          >
            {t('hero.subtitle', { default: 'Industry-leading metal fabrication services delivering precision, quality, and innovation for over 25 years.' })}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F2A900] to-[#D99700] text-[#1A1A1A] text-lg font-extrabold rounded-lg shadow-2xl hover:shadow-[0_0_30px_rgba(242,169,0,0.5)] hover:from-[#FFCA28] hover:to-[#F2A900] transition-all duration-300 hover:scale-105 group"
            >
              {t('hero.cta.primary', { default: 'Get a Quote' })}
              <svg
                className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-lg font-bold rounded-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300"
            >
              {t('hero.cta.secondary', { default: 'View Our Services' })}
            </Link>
          </motion.div>

          {/* Key Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: '25+', label: t('hero.stats.years', { default: 'Years Experience' }) },
              { number: '500+', label: t('hero.stats.projects', { default: 'Projects Completed' }) },
              { number: '100+', label: t('hero.stats.clients', { default: 'Happy Clients' }) },
              { number: 'ISO', label: t('hero.stats.certified', { default: 'Certified Quality' }) },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-[#F2A900] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
        >
          <div className="w-1 h-3 bg-[#F2A900] rounded-full mx-auto" />
        </motion.div>
      </motion.div>
    </div>
  );
}
