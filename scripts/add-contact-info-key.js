/**
 * Add Missing contact_info Key
 * Quick fix to add the missing common.contact_info translation key
 */

const fs = require('fs');
const path = require('path');

const KEYS = {
  en: 'Contact Information',
  ar: 'معلومات الاتصال',
  tr: 'İletişim Bilgileri',
};

function addKey(locale) {
  const filePath = path.join(__dirname, '..', 'messages', `${locale}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  if (!content.common.contact_info) {
    content.common.contact_info = KEYS[locale];
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');
    console.log(`✅ Added contact_info to ${locale}.json`);
  } else {
    console.log(`ℹ️  contact_info already exists in ${locale}.json`);
  }
}

['en', 'ar', 'tr'].forEach(addKey);
console.log('\n✅ Done!');
