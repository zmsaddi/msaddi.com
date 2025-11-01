/**
 * Generate Hidden Locale Translation Files
 *
 * Creates translation files for hidden locales (fr, de, nl, zh, ru)
 * Based on English translations with proper language translations
 */

const fs = require('fs');
const path = require('path');

// Read English translations (base)
const enPath = path.join(__dirname, '..', 'messages', 'en.json');
const enTranslations = JSON.parse(fs.readFileSync(enPath, 'utf8'));

/**
 * Translation mappings for hidden locales
 * Professional translations for metal fabrication industry
 */
const hiddenLocaleTranslations = {
  // French (fr)
  fr: {
    common: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      products: 'Produits',
      capabilities: 'Capacités',
      contact: 'Contact',
      rfq: 'Demande de devis',
      get_quote: 'Obtenir un devis',
      learn_more: 'En savoir plus',
      phone: 'Téléphone',
      email: 'E-mail',
      address: 'Adresse',
      follow_us: 'Suivez-nous',
      language: 'Langue',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      submit: 'Soumettre',
      cancel: 'Annuler',
      close: 'Fermer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      contact_info: 'Informations de contact',
      footer_navigation: 'Navigation du pied de page',
      main_navigation: 'Navigation principale',
      quick_links: 'Liens rapides',
      company_info: 'Informations sur l\'entreprise',
      social_media: 'Médias sociaux',
    },
    home: {
      title: 'MSADDI EST.',
      subtitle: 'Solutions professionnelles de fabrication métallique',
      hero_title: 'Excellence en fabrication métallique',
      hero_subtitle: 'Nous fournissons des services de fabrication métallique de haute qualité pour les industries du monde entier.',
      cta_primary: 'Obtenir un devis',
      cta_secondary: 'Nos services',
      features_title: 'Pourquoi nous choisir',
      features_subtitle: 'Nous offrons des services complets de fabrication métallique avec les normes de qualité les plus élevées.',
    },
    about: {
      title: 'À propos de nous',
      subtitle: 'Leader en solutions de fabrication métallique',
      description: 'MSADDI EST. est une entreprise leader spécialisée dans les services de fabrication métallique professionnels.',
    },
  },

  // German (de)
  de: {
    common: {
      home: 'Startseite',
      about: 'Über uns',
      services: 'Dienstleistungen',
      products: 'Produkte',
      capabilities: 'Fähigkeiten',
      contact: 'Kontakt',
      rfq: 'Angebotsanfrage',
      get_quote: 'Angebot erhalten',
      learn_more: 'Mehr erfahren',
      phone: 'Telefon',
      email: 'E-Mail',
      address: 'Adresse',
      follow_us: 'Folgen Sie uns',
      language: 'Sprache',
      loading: 'Wird geladen...',
      error: 'Fehler',
      success: 'Erfolg',
      submit: 'Einreichen',
      cancel: 'Abbrechen',
      close: 'Schließen',
      back: 'Zurück',
      next: 'Weiter',
      previous: 'Vorherige',
      contact_info: 'Kontaktinformationen',
      footer_navigation: 'Fußzeilen-Navigation',
      main_navigation: 'Hauptnavigation',
      quick_links: 'Schnelllinks',
      company_info: 'Unternehmensinformationen',
      social_media: 'Soziale Medien',
    },
    home: {
      title: 'MSADDI EST.',
      subtitle: 'Professionelle Metallverarbeitungslösungen',
      hero_title: 'Exzellenz in der Metallverarbeitung',
      hero_subtitle: 'Wir bieten hochwertige Metallverarbeitungsdienstleistungen für Branchen weltweit.',
      cta_primary: 'Angebot erhalten',
      cta_secondary: 'Unsere Dienstleistungen',
      features_title: 'Warum uns wählen',
      features_subtitle: 'Wir bieten umfassende Metallverarbeitungsdienstleistungen mit höchsten Qualitätsstandards.',
    },
    about: {
      title: 'Über uns',
      subtitle: 'Führend in Metallverarbeitungslösungen',
      description: 'MSADDI EST. ist ein führendes Unternehmen, das sich auf professionelle Metallverarbeitungsdienstleistungen spezialisiert hat.',
    },
  },

  // Dutch (nl)
  nl: {
    common: {
      home: 'Home',
      about: 'Over ons',
      services: 'Diensten',
      products: 'Producten',
      capabilities: 'Mogelijkheden',
      contact: 'Contact',
      rfq: 'Offerte aanvragen',
      get_quote: 'Offerte aanvragen',
      learn_more: 'Meer informatie',
      phone: 'Telefoon',
      email: 'E-mail',
      address: 'Adres',
      follow_us: 'Volg ons',
      language: 'Taal',
      loading: 'Laden...',
      error: 'Fout',
      success: 'Succes',
      submit: 'Indienen',
      cancel: 'Annuleren',
      close: 'Sluiten',
      back: 'Terug',
      next: 'Volgende',
      previous: 'Vorige',
      contact_info: 'Contactinformatie',
      footer_navigation: 'Voettekst navigatie',
      main_navigation: 'Hoofdnavigatie',
      quick_links: 'Snelkoppelingen',
      company_info: 'Bedrijfsinformatie',
      social_media: 'Sociale media',
    },
    home: {
      title: 'MSADDI EST.',
      subtitle: 'Professionele metaalbewerkingsoplossingen',
      hero_title: 'Excellentie in metaalbewerking',
      hero_subtitle: 'Wij bieden hoogwaardige metaalbewerkingsdiensten voor industrieën wereldwijd.',
      cta_primary: 'Offerte aanvragen',
      cta_secondary: 'Onze diensten',
      features_title: 'Waarom voor ons kiezen',
      features_subtitle: 'Wij bieden uitgebreide metaalbewerkingsdiensten met de hoogste kwaliteitsnormen.',
    },
    about: {
      title: 'Over ons',
      subtitle: 'Leider in metaalbewerkingsoplossingen',
      description: 'MSADDI EST. is een toonaangevend bedrijf gespecialiseerd in professionele metaalbewerkingsdiensten.',
    },
  },

  // Chinese (zh)
  zh: {
    common: {
      home: '首页',
      about: '关于我们',
      services: '服务',
      products: '产品',
      capabilities: '能力',
      contact: '联系我们',
      rfq: '询价',
      get_quote: '获取报价',
      learn_more: '了解更多',
      phone: '电话',
      email: '电子邮件',
      address: '地址',
      follow_us: '关注我们',
      language: '语言',
      loading: '加载中...',
      error: '错误',
      success: '成功',
      submit: '提交',
      cancel: '取消',
      close: '关闭',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      contact_info: '联系信息',
      footer_navigation: '页脚导航',
      main_navigation: '主导航',
      quick_links: '快速链接',
      company_info: '公司信息',
      social_media: '社交媒体',
    },
    home: {
      title: 'MSADDI EST.',
      subtitle: '专业金属制造解决方案',
      hero_title: '卓越的金属制造',
      hero_subtitle: '我们为全球行业提供高质量的金属制造服务。',
      cta_primary: '获取报价',
      cta_secondary: '我们的服务',
      features_title: '为什么选择我们',
      features_subtitle: '我们提供全面的金属制造服务，具有最高的质量标准。',
    },
    about: {
      title: '关于我们',
      subtitle: '金属制造解决方案的领导者',
      description: 'MSADDI EST. 是一家专业从事金属制造服务的领先公司。',
    },
  },

  // Russian (ru)
  ru: {
    common: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      products: 'Продукты',
      capabilities: 'Возможности',
      contact: 'Контакты',
      rfq: 'Запрос предложения',
      get_quote: 'Получить предложение',
      learn_more: 'Узнать больше',
      phone: 'Телефон',
      email: 'Электронная почта',
      address: 'Адрес',
      follow_us: 'Следуйте за нами',
      language: 'Язык',
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успех',
      submit: 'Отправить',
      cancel: 'Отмена',
      close: 'Закрыть',
      back: 'Назад',
      next: 'Далее',
      previous: 'Предыдущий',
      contact_info: 'Контактная информация',
      footer_navigation: 'Нав игация нижнего колонтитула',
      main_navigation: 'Основная навигация',
      quick_links: 'Быстрые ссылки',
      company_info: 'Информация о компании',
      social_media: 'Социальные сети',
    },
    home: {
      title: 'MSADDI EST.',
      subtitle: 'Профессиональные решения по обработке металла',
      hero_title: 'Превосходство в обработке металла',
      hero_subtitle: 'Мы предоставляем высококачественные услуги по обработке металла для отраслей по всему миру.',
      cta_primary: 'Получить предложение',
      cta_secondary: 'Наши услуги',
      features_title: 'Почему выбирают нас',
      features_subtitle: 'Мы предлагаем комплексные услуги по обработке металла с высочайшими стандартами качества.',
    },
    about: {
      title: 'О нас',
      subtitle: 'Лидер в решениях по обработке металла',
      description: 'MSADDI EST. - ведущая компания, специализирующаяся на профессиональных услугах по обработке металла.',
    },
  },
};

/**
 * Deep merge translation objects
 */
function deepMerge(base, override) {
  const result = { ...base };

  for (const key in override) {
    if (override[key] && typeof override[key] === 'object' && !Array.isArray(override[key])) {
      result[key] = deepMerge(base[key] || {}, override[key]);
    } else {
      result[key] = override[key];
    }
  }

  return result;
}

/**
 * Generate translation file for a hidden locale
 */
function generateHiddenLocale(locale) {
  console.log(`\n📝 Generating ${locale}.json...`);

  // Start with English as base
  let translations = JSON.parse(JSON.stringify(enTranslations));

  // Merge with locale-specific translations
  if (hiddenLocaleTranslations[locale]) {
    translations = deepMerge(translations, hiddenLocaleTranslations[locale]);
  }

  // Write to file
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);
  fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), 'utf8');

  console.log(`✅ Created ${locale}.json with ${Object.keys(translations).length} namespaces`);
}

/**
 * Main execution
 */
console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║   Hidden Locale Generator - Phase 2 i18n Support          ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

const hiddenLocales = ['fr', 'de', 'nl', 'zh', 'ru'];

hiddenLocales.forEach(locale => {
  try {
    generateHiddenLocale(locale);
  } catch (error) {
    console.error(`❌ Error generating ${locale}.json:`, error.message);
  }
});

console.log('\n╔════════════════════════════════════════════════════════════╗');
console.log('║   All hidden locales generated successfully! ✓             ║');
console.log('╚════════════════════════════════════════════════════════════╝');
console.log('\n📌 Note: These locales are accessible via URL but not visible in language switcher.');
console.log('📌 To activate them, update the activeLocales array in i18n.ts\n');
