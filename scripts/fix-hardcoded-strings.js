/**
 * Fix Hardcoded Strings
 * Automatically replaces hardcoded strings with translation keys
 */

const fs = require('fs');
const path = require('path');

// Replacements map
const REPLACEMENTS = [
  // Footer.tsx
  {
    file: 'components/Footer.tsx',
    changes: [
      {
        find: '<h4 className="text-lg font-semibold text-white">Quick Links</h4>',
        replace: '<h4 className="text-lg font-semibold text-white">{t(\'quick_links\')}</h4>',
      },
      {
        find: 'aria-label="Footer navigation"',
        replace: 'aria-label={t(\'footer_navigation\')}',
      },
      {
        find: '<h4 className="text-lg font-semibold text-white">Contact</h4>',
        replace: '<h4 className="text-lg font-semibold text-white">{t(\'contact\')}</h4>',
      },
      {
        find: '<h4 className="text-lg font-semibold text-white">Follow Us</h4>',
        replace: '<h4 className="text-lg font-semibold text-white">{t(\'follow_us\')}</h4>',
      },
      {
        find: 'aria-label="Facebook"',
        replace: 'aria-label={t(\'facebook_link\')}',
      },
      {
        find: 'aria-label="Twitter"',
        replace: 'aria-label={t(\'twitter_link\')}',
      },
      {
        find: 'aria-label="LinkedIn"',
        replace: 'aria-label={t(\'linkedin_link\')}',
      },
    ],
  },
  // Header.tsx
  {
    file: 'components/Header.tsx',
    changes: [
      {
        find: 'aria-label="Main navigation"',
        replace: 'aria-label={t(\'main_navigation\')}',
      },
      {
        find: 'aria-label="Toggle menu"',
        replace: 'aria-label={t(\'toggle_menu\')}',
      },
    ],
  },
  // WhatsAppButton.tsx
  {
    file: 'components/WhatsAppButton.tsx',
    changes: [
      {
        find: 'aria-label="whatsapp"',
        replace: 'aria-label={t(\'whatsapp_link\')}',
      },
    ],
  },
  // GoogleTranslateWidget.tsx
  {
    file: 'components/GoogleTranslateWidget.tsx',
    changes: [
      {
        find: 'aria-label="Enable automatic translation"',
        replace: 'aria-label={t(\'enable_translation\')}',
      },
      {
        find: 'aria-label="close"',
        replace: 'aria-label={t(\'close\')}',
      },
      {
        find: 'aria-label="Disable automatic translation"',
        replace: 'aria-label={t(\'disable_translation\')}',
      },
    ],
  },
];

function fixFile(fileInfo) {
  const filePath = path.join(__dirname, '..', fileInfo.file);

  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠️  File not found: ${fileInfo.file}`);
    return;
  }

  console.log(`\n📝 Fixing ${fileInfo.file}...`);

  let content = fs.readFileSync(filePath, 'utf8');
  let changesMade = 0;

  fileInfo.changes.forEach(({ find, replace }) => {
    if (content.includes(find)) {
      content = content.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
      changesMade++;
      console.log(`  ✅ Replaced: ${find.substring(0, 50)}${find.length > 50 ? '...' : ''}`);
    } else {
      console.log(`  ℹ️  Not found: ${find.substring(0, 50)}${find.length > 50 ? '...' : ''}`);
    }
  });

  if (changesMade > 0) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ Saved ${changesMade} changes`);
  } else {
    console.log(`  ℹ️  No changes needed`);
  }
}

console.log('🔧 Fixing hardcoded strings...\n');
REPLACEMENTS.forEach(fixFile);
console.log('\n✅ Done!');
