/**
 * Add Blog Navigation Translation Script
 * Adds "blog" key to the common namespace for navigation
 */

const fs = require('fs');
const path = require('path');

const blogNavTranslations = {
  en: 'Blog',
  ar: 'المدونة',
  tr: 'Blog',
  fr: 'Blog',
  de: 'Blog',
  nl: 'Blog',
  zh: '博客',
  ru: 'Блог'
};

const locales = ['en', 'ar', 'tr', 'fr', 'de', 'nl', 'zh', 'ru'];
const messagesDir = path.join(__dirname, '..', 'messages');

locales.forEach(locale => {
  const filePath = path.join(messagesDir, `${locale}.json`);

  try {
    // Read existing translations
    const existingContent = fs.readFileSync(filePath, 'utf8');
    const existingTranslations = JSON.parse(existingContent);

    // Add blog to common namespace (after capabilities)
    const commonKeys = Object.keys(existingTranslations.common);
    const capabilitiesIndex = commonKeys.indexOf('capabilities');

    if (capabilitiesIndex !== -1) {
      const newCommon = {};
      commonKeys.forEach((key, index) => {
        newCommon[key] = existingTranslations.common[key];
        if (index === capabilitiesIndex) {
          newCommon.blog = blogNavTranslations[locale];
        }
      });
      existingTranslations.common = newCommon;
    } else {
      // Just add at the end if capabilities not found
      existingTranslations.common.blog = blogNavTranslations[locale];
    }

    // Write back with proper formatting
    fs.writeFileSync(
      filePath,
      JSON.stringify(existingTranslations, null, 2) + '\n',
      'utf8'
    );

    console.log(`✅ Updated ${locale}.json with blog navigation translation`);
  } catch (error) {
    console.error(`❌ Error updating ${locale}.json:`, error.message);
  }
});

console.log('\n✅ All language files updated with blog navigation!');
