/**
 * Add PWA Translations
 *
 * Adds PWA install prompt translations to all language files
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

// Translations for each language
const pwaTranslations = {
  en: {
    install_title: "Install MSADDI App",
    install_description: "Install our app for faster access, offline support, and a better mobile experience.",
    install_description_ios: "Get quick access to MSADDI with our app. Install it on your home screen for a better experience.",
    install_button: "Install App",
    maybe_later: "Maybe Later",
    ios_instructions_title: "How to install:",
    ios_step_1: "Tap the Share button in Safari",
    ios_step_2: "Scroll down and tap 'Add to Home Screen'",
    ios_step_3: "Tap 'Add' to confirm"
  },
  ar: {
    install_title: "تثبيت تطبيق MSADDI",
    install_description: "ثبّت تطبيقنا للوصول الأسرع ودعم وضع عدم الاتصال وتجربة محمول أفضل.",
    install_description_ios: "احصل على وصول سريع إلى MSADDI من خلال تطبيقنا. ثبّته على شاشتك الرئيسية للحصول على تجربة أفضل.",
    install_button: "تثبيت التطبيق",
    maybe_later: "ربما لاحقاً",
    ios_instructions_title: "كيفية التثبيت:",
    ios_step_1: "انقر على زر المشاركة في Safari",
    ios_step_2: "مرر لأسفل وانقر على 'إضافة إلى الشاشة الرئيسية'",
    ios_step_3: "انقر على 'إضافة' للتأكيد"
  },
  tr: {
    install_title: "MSADDI Uygulamasını Yükle",
    install_description: "Daha hızlı erişim, çevrimdışı destek ve daha iyi mobil deneyim için uygulamamızı yükleyin.",
    install_description_ios: "Uygulamamızla MSADDI'ye hızlı erişim sağlayın. Daha iyi bir deneyim için ana ekranınıza yükleyin.",
    install_button: "Uygulamayı Yükle",
    maybe_later: "Belki Sonra",
    ios_instructions_title: "Nasıl yüklenir:",
    ios_step_1: "Safari'de Paylaş düğmesine dokunun",
    ios_step_2: "Aşağı kaydırın ve 'Ana Ekrana Ekle' seçeneğine dokunun",
    ios_step_3: "Onaylamak için 'Ekle' seçeneğine dokunun"
  },
  fr: {
    install_title: "Installer l'application MSADDI",
    install_description: "Installez notre application pour un accès plus rapide, une prise en charge hors ligne et une meilleure expérience mobile.",
    install_description_ios: "Accédez rapidement à MSADDI avec notre application. Installez-la sur votre écran d'accueil pour une meilleure expérience.",
    install_button: "Installer l'application",
    maybe_later: "Peut-être plus tard",
    ios_instructions_title: "Comment installer :",
    ios_step_1: "Appuyez sur le bouton Partager dans Safari",
    ios_step_2: "Faites défiler vers le bas et appuyez sur 'Ajouter à l'écran d'accueil'",
    ios_step_3: "Appuyez sur 'Ajouter' pour confirmer"
  },
  de: {
    install_title: "MSADDI App installieren",
    install_description: "Installieren Sie unsere App für schnelleren Zugriff, Offline-Unterstützung und ein besseres mobiles Erlebnis.",
    install_description_ios: "Erhalten Sie schnellen Zugriff auf MSADDI mit unserer App. Installieren Sie sie auf Ihrem Startbildschirm für ein besseres Erlebnis.",
    install_button: "App installieren",
    maybe_later: "Vielleicht später",
    ios_instructions_title: "So installieren Sie:",
    ios_step_1: "Tippen Sie auf die Schaltfläche Teilen in Safari",
    ios_step_2: "Scrollen Sie nach unten und tippen Sie auf 'Zum Home-Bildschirm'",
    ios_step_3: "Tippen Sie auf 'Hinzufügen', um zu bestätigen"
  },
  nl: {
    install_title: "MSADDI App installeren",
    install_description: "Installeer onze app voor snellere toegang, offline ondersteuning en een betere mobiele ervaring.",
    install_description_ios: "Krijg snelle toegang tot MSADDI met onze app. Installeer het op je startscherm voor een betere ervaring.",
    install_button: "App installeren",
    maybe_later: "Misschien later",
    ios_instructions_title: "Hoe te installeren:",
    ios_step_1: "Tik op de knop Delen in Safari",
    ios_step_2: "Scroll naar beneden en tik op 'Toevoegen aan beginscherm'",
    ios_step_3: "Tik op 'Toevoegen' om te bevestigen"
  },
  zh: {
    install_title: "安装 MSADDI 应用",
    install_description: "安装我们的应用以获得更快的访问速度、离线支持和更好的移动体验。",
    install_description_ios: "使用我们的应用快速访问 MSADDI。将其安装到主屏幕以获得更好的体验。",
    install_button: "安装应用",
    maybe_later: "以后再说",
    ios_instructions_title: "如何安装：",
    ios_step_1: "点击 Safari 中的共享按钮",
    ios_step_2: "向下滚动并点击 '添加到主屏幕'",
    ios_step_3: "点击 '添加' 确认"
  },
  ru: {
    install_title: "Установить приложение MSADDI",
    install_description: "Установите наше приложение для более быстрого доступа, поддержки офлайн-режима и лучшего мобильного опыта.",
    install_description_ios: "Получите быстрый доступ к MSADDI с помощью нашего приложения. Установите его на главный экран для лучшего опыта.",
    install_button: "Установить приложение",
    maybe_later: "Может быть, позже",
    ios_instructions_title: "Как установить:",
    ios_step_1: "Нажмите кнопку 'Поделиться' в Safari",
    ios_step_2: "Прокрутите вниз и нажмите 'На экран Домой'",
    ios_step_3: "Нажмите 'Добавить' для подтверждения"
  }
};

function addPWATranslations() {
  console.log('\n📱 Adding PWA translations to all language files...\n');

  let successCount = 0;
  let errorCount = 0;

  // Process each language file
  Object.keys(pwaTranslations).forEach((locale) => {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

    try {
      // Read existing translations
      const content = fs.readFileSync(filePath, 'utf8');
      const translations = JSON.parse(content);

      // Check if pwa section already exists
      if (translations.pwa) {
        console.log(`⏭️  ${locale}.json - PWA translations already exist, skipping`);
        return;
      }

      // Add pwa translations
      translations.pwa = pwaTranslations[locale];

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf8');
      console.log(`✅ ${locale}.json - Added PWA translations`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${locale}.json - Error: ${error.message}`);
      errorCount++;
    }
  });

  console.log(`\n✨ Complete! Added PWA translations to ${successCount} file(s).`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} file(s) had errors.`);
  }
  console.log();
}

// Run the script
addPWATranslations();
