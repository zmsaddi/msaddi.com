/**
 * Add Offline Translations
 *
 * Adds offline page translations to all language files
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

// Translations for each language
const offlineTranslations = {
  ar: {
    title: "أنت غير متصل بالإنترنت",
    description: "يبدو أنك فقدت اتصالك بالإنترنت. قد لا تكون بعض الميزات متاحة حتى تعود للاتصال.",
    suggestions: {
      title: "ما يمكنك فعله:",
      checkConnection: "تحقق من اتصالك بالإنترنت",
      tryAgain: "حاول تحديث الصفحة",
      returnHome: "العودة إلى الصفحة الرئيسية للمحتوى المخزن مؤقتاً"
    },
    actions: {
      retry: "حاول مرة أخرى",
      home: "الذهاب للرئيسية"
    },
    info: "يتم عرض هذه الصفحة لأن جهازك غير متصل بالإنترنت حالياً. بمجرد استعادة اتصالك، ستتمكن من الوصول إلى جميع الميزات بشكل طبيعي."
  },
  tr: {
    title: "Çevrimdışısınız",
    description: "İnternet bağlantınızı kaybettiniz gibi görünüyor. Tekrar çevrimiçi olana kadar bazı özellikler kullanılamayabilir.",
    suggestions: {
      title: "Yapabilecekleriniz:",
      checkConnection: "İnternet bağlantınızı kontrol edin",
      tryAgain: "Sayfayı yenilemeyi deneyin",
      returnHome: "Önbelleğe alınmış içerik için ana sayfaya dönün"
    },
    actions: {
      retry: "Tekrar Dene",
      home: "Ana Sayfa"
    },
    info: "Bu sayfa, cihazınız şu anda çevrimdışı olduğu için gösteriliyor. Bağlantınız geri geldiğinde tüm özelliklere normal şekilde erişebileceksiniz."
  },
  fr: {
    title: "Vous êtes hors ligne",
    description: "Il semble que vous ayez perdu votre connexion Internet. Certaines fonctionnalités peuvent ne pas être disponibles tant que vous n'êtes pas de nouveau en ligne.",
    suggestions: {
      title: "Ce que vous pouvez faire:",
      checkConnection: "Vérifiez votre connexion Internet",
      tryAgain: "Essayez de rafraîchir la page",
      returnHome: "Retournez à la page d'accueil pour le contenu en cache"
    },
    actions: {
      retry: "Réessayer",
      home: "Accueil"
    },
    info: "Cette page est affichée car votre appareil est actuellement hors ligne. Une fois votre connexion rétablie, vous pourrez accéder à toutes les fonctionnalités normalement."
  },
  de: {
    title: "Sie sind offline",
    description: "Es scheint, als hätten Sie Ihre Internetverbindung verloren. Einige Funktionen sind möglicherweise nicht verfügbar, bis Sie wieder online sind.",
    suggestions: {
      title: "Was Sie tun können:",
      checkConnection: "Überprüfen Sie Ihre Internetverbindung",
      tryAgain: "Versuchen Sie, die Seite zu aktualisieren",
      returnHome: "Kehren Sie zur Startseite für zwischengespeicherte Inhalte zurück"
    },
    actions: {
      retry: "Erneut versuchen",
      home: "Startseite"
    },
    info: "Diese Seite wird angezeigt, weil Ihr Gerät derzeit offline ist. Sobald Ihre Verbindung wiederhergestellt ist, können Sie normal auf alle Funktionen zugreifen."
  },
  nl: {
    title: "Je bent offline",
    description: "Het lijkt erop dat je je internetverbinding hebt verloren. Sommige functies zijn mogelijk niet beschikbaar totdat je weer online bent.",
    suggestions: {
      title: "Wat je kunt doen:",
      checkConnection: "Controleer je internetverbinding",
      tryAgain: "Probeer de pagina te vernieuwen",
      returnHome: "Keer terug naar de homepage voor gecachte inhoud"
    },
    actions: {
      retry: "Probeer opnieuw",
      home: "Naar Home"
    },
    info: "Deze pagina wordt weergegeven omdat je apparaat momenteel offline is. Zodra je verbinding is hersteld, kun je normaal toegang krijgen tot alle functies."
  },
  zh: {
    title: "您已离线",
    description: "看起来您已失去互联网连接。在您重新上线之前，某些功能可能不可用。",
    suggestions: {
      title: "您可以做的：",
      checkConnection: "检查您的互联网连接",
      tryAgain: "尝试刷新页面",
      returnHome: "返回主页查看缓存内容"
    },
    actions: {
      retry: "重试",
      home: "返回主页"
    },
    info: "显示此页面是因为您的设备当前处于离线状态。一旦恢复连接，您将能够正常访问所有功能。"
  },
  ru: {
    title: "Вы не в сети",
    description: "Похоже, вы потеряли подключение к интернету. Некоторые функции могут быть недоступны, пока вы снова не подключитесь к сети.",
    suggestions: {
      title: "Что вы можете сделать:",
      checkConnection: "Проверьте подключение к интернету",
      tryAgain: "Попробуйте обновить страницу",
      returnHome: "Вернитесь на главную страницу для кэшированного контента"
    },
    actions: {
      retry: "Попробовать снова",
      home: "Домой"
    },
    info: "Эта страница отображается, потому что ваше устройство в данный момент не подключено к сети. Как только ваше соединение будет восстановлено, вы сможете получить доступ ко всем функциям в обычном режиме."
  }
};

function addOfflineTranslations() {
  console.log('\n🌐 Adding offline translations to all language files...\n');

  let successCount = 0;
  let errorCount = 0;

  // Process each language file
  Object.keys(offlineTranslations).forEach((locale) => {
    const filePath = path.join(MESSAGES_DIR, `${locale}.json`);

    try {
      // Read existing translations
      const content = fs.readFileSync(filePath, 'utf8');
      const translations = JSON.parse(content);

      // Check if offline section already exists
      if (translations.offline) {
        console.log(`⏭️  ${locale}.json - Offline translations already exist, skipping`);
        return;
      }

      // Add offline translations
      translations.offline = offlineTranslations[locale];

      // Write back to file
      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2) + '\n', 'utf8');
      console.log(`✅ ${locale}.json - Added offline translations`);
      successCount++;
    } catch (error) {
      console.error(`❌ ${locale}.json - Error: ${error.message}`);
      errorCount++;
    }
  });

  console.log(`\n✨ Complete! Added offline translations to ${successCount} file(s).`);
  if (errorCount > 0) {
    console.log(`⚠️  ${errorCount} file(s) had errors.`);
  }
  console.log();
}

// Run the script
addOfflineTranslations();
