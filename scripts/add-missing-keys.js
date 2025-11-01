/**
 * Add Missing Translation Keys
 * Adds all hardcoded string keys to translation files
 */

const fs = require('fs');
const path = require('path');

// New keys to add to common section
const NEW_KEYS = {
  en: {
    quick_links: 'Quick Links',
    follow_us: 'Follow Us',
    footer_navigation: 'Footer navigation',
    main_navigation: 'Main navigation',
    toggle_menu: 'Toggle menu',
    facebook_link: 'Facebook',
    twitter_link: 'Twitter',
    linkedin_link: 'LinkedIn',
    instagram_link: 'Instagram',
    youtube_link: 'YouTube',
    whatsapp_link: 'WhatsApp',
    enable_translation: 'Enable automatic translation',
    disable_translation: 'Disable automatic translation',
    close: 'Close',
  },
  ar: {
    quick_links: 'روابط سريعة',
    follow_us: 'تابعنا',
    footer_navigation: 'التنقل في التذييل',
    main_navigation: 'التنقل الرئيسي',
    toggle_menu: 'تبديل القائمة',
    facebook_link: 'فيسبوك',
    twitter_link: 'تويتر',
    linkedin_link: 'لينكد إن',
    instagram_link: 'إنستغرام',
    youtube_link: 'يوتيوب',
    whatsapp_link: 'واتساب',
    enable_translation: 'تفعيل الترجمة الآلية',
    disable_translation: 'إيقاف الترجمة الآلية',
    close: 'إغلاق',
  },
  tr: {
    quick_links: 'Hızlı Bağlantılar',
    follow_us: 'Bizi Takip Edin',
    footer_navigation: 'Alt bilgi gezinmesi',
    main_navigation: 'Ana gezinme',
    toggle_menu: 'Menüyü aç/kapat',
    facebook_link: 'Facebook',
    twitter_link: 'Twitter',
    linkedin_link: 'LinkedIn',
    instagram_link: 'Instagram',
    youtube_link: 'YouTube',
    whatsapp_link: 'WhatsApp',
    enable_translation: 'Otomatik çeviriyi etkinleştir',
    disable_translation: 'Otomatik çeviriyi devre dışı bırak',
    close: 'Kapat',
  },
};

function addMissingKeys(locale) {
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);

  console.log(`\n📝 Processing ${locale}.json...`);

  // Read existing file
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // Add new keys to common section
  const keysAdded = [];
  const keysSkipped = [];

  Object.entries(NEW_KEYS[locale]).forEach(([key, value]) => {
    if (!content.common[key]) {
      content.common[key] = value;
      keysAdded.push(key);
    } else {
      keysSkipped.push(key);
    }
  });

  // Write back
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

  console.log(`  ✅ Added ${keysAdded.length} keys`);
  if (keysAdded.length > 0) {
    keysAdded.forEach(key => console.log(`     + ${key}`));
  }

  if (keysSkipped.length > 0) {
    console.log(`  ℹ️  Skipped ${keysSkipped.length} existing keys`);
  }
}

// Process all locales
console.log('🔧 Adding missing translation keys...');
['en', 'ar', 'tr'].forEach(addMissingKeys);
console.log('\n✅ Done!');
