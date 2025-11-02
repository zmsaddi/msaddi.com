const fs = require('fs');
const path = require('path');

// Additional translations to add to common.json files
const commonTranslations = {
  en: {
    whatsapp: {
      button: "WhatsApp",
      label: "Chat on WhatsApp",
      tooltip: "Chat with us on WhatsApp",
      quickQuote: "Get instant quote & support",
      chatNow: "Start Chat",
      quickResponse: "Quick response guaranteed",
      message: "Hello MSADDI.EST, I'm interested in your metal fabrication services."
    },
    theme: {
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
      switchTo: "Switch to"
    },
    map: {
      title: "Our Location",
      getDirections: "Get Directions",
      location: "Location",
      zoneType: "Zone Type",
      industrialArea: "Industrial Area",
      transportation: "Transportation",
      easyAccess: "Easy Access",
      alShaqeef: "Al-Shaqeef Zone",
      address: "Al-Shaqeef Industrial Zone, Aleppo, Syria",
      companyName: "MSADDI.EST Metal Fabrication"
    },
    accessibility: {
      contactWhatsApp: "Contact on WhatsApp",
      selectLanguage: "Select language",
      toggleMenu: "Toggle menu",
      mapTitle: "MSADDI.EST Location Map",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Workshop Image"
    }
  },
  ar: {
    whatsapp: {
      button: "واتساب",
      label: "تحدث معنا على واتساب",
      tooltip: "تحدث معنا على واتساب",
      quickQuote: "احصل على عرض أسعار فوري ودعم",
      chatNow: "ابدأ المحادثة",
      quickResponse: "استجابة سريعة مضمونة",
      message: "مرحباً MSADDI.EST، أنا مهتم بخدمات تصنيع المعادن الخاصة بكم."
    },
    theme: {
      lightMode: "الوضع النهاري",
      darkMode: "الوضع الليلي",
      switchTo: "التبديل إلى"
    },
    map: {
      title: "موقعنا",
      getDirections: "الحصول على الاتجاهات",
      location: "الموقع",
      zoneType: "نوع المنطقة",
      industrialArea: "منطقة صناعية",
      transportation: "المواصلات",
      easyAccess: "وصول سهل",
      alShaqeef: "منطقة الشقيف",
      address: "المنطقة الصناعية الشقيف، حلب، سوريا",
      companyName: "MSADDI.EST لتصنيع المعادن"
    },
    accessibility: {
      contactWhatsApp: "تواصل عبر واتساب",
      selectLanguage: "اختر اللغة",
      toggleMenu: "تبديل القائمة",
      mapTitle: "خريطة موقع MSADDI.EST",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "صورة الورشة"
    }
  },
  tr: {
    whatsapp: {
      button: "WhatsApp",
      label: "WhatsApp'ta sohbet edin",
      tooltip: "WhatsApp'ta bizimle sohbet edin",
      quickQuote: "Anında teklif ve destek alın",
      chatNow: "Sohbeti Başlat",
      quickResponse: "Hızlı yanıt garantili",
      message: "Merhaba MSADDI.EST, metal fabrikasyon hizmetlerinizle ilgileniyorum."
    },
    theme: {
      lightMode: "Aydınlık Mod",
      darkMode: "Karanlık Mod",
      switchTo: "Geç"
    },
    map: {
      title: "Konumumuz",
      getDirections: "Yol Tarifi Al",
      location: "Konum",
      zoneType: "Bölge Tipi",
      industrialArea: "Sanayi Bölgesi",
      transportation: "Ulaşım",
      easyAccess: "Kolay Erişim",
      alShaqeef: "Al-Shaqeef Bölgesi",
      address: "Al-Shaqeef Sanayi Bölgesi, Halep, Suriye",
      companyName: "MSADDI.EST Metal Fabrikasyon"
    },
    accessibility: {
      contactWhatsApp: "WhatsApp ile iletişim",
      selectLanguage: "Dil seçin",
      toggleMenu: "Menüyü aç/kapat",
      mapTitle: "MSADDI.EST Konum Haritası",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Atölye Resmi"
    }
  },
  fr: {
    whatsapp: {
      button: "WhatsApp",
      label: "Discuter sur WhatsApp",
      tooltip: "Discutez avec nous sur WhatsApp",
      quickQuote: "Obtenez un devis instantané et de l'aide",
      chatNow: "Commencer le chat",
      quickResponse: "Réponse rapide garantie",
      message: "Bonjour MSADDI.EST, je suis intéressé par vos services de fabrication métallique."
    },
    theme: {
      lightMode: "Mode clair",
      darkMode: "Mode sombre",
      switchTo: "Passer en"
    },
    map: {
      title: "Notre emplacement",
      getDirections: "Obtenir l'itinéraire",
      location: "Emplacement",
      zoneType: "Type de zone",
      industrialArea: "Zone industrielle",
      transportation: "Transport",
      easyAccess: "Accès facile",
      alShaqeef: "Zone Al-Shaqeef",
      address: "Zone industrielle Al-Shaqeef, Alep, Syrie",
      companyName: "MSADDI.EST Fabrication Métallique"
    },
    accessibility: {
      contactWhatsApp: "Contact sur WhatsApp",
      selectLanguage: "Sélectionner la langue",
      toggleMenu: "Basculer le menu",
      mapTitle: "Carte de localisation MSADDI.EST",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Image de l'atelier"
    }
  },
  de: {
    whatsapp: {
      button: "WhatsApp",
      label: "Auf WhatsApp chatten",
      tooltip: "Chatten Sie mit uns auf WhatsApp",
      quickQuote: "Sofortiges Angebot und Support",
      chatNow: "Chat starten",
      quickResponse: "Schnelle Antwort garantiert",
      message: "Hallo MSADDI.EST, ich bin an Ihren Metallverarbeitungsdiensten interessiert."
    },
    theme: {
      lightMode: "Heller Modus",
      darkMode: "Dunkler Modus",
      switchTo: "Wechseln zu"
    },
    map: {
      title: "Unser Standort",
      getDirections: "Route berechnen",
      location: "Standort",
      zoneType: "Zonentyp",
      industrialArea: "Industriegebiet",
      transportation: "Transport",
      easyAccess: "Einfacher Zugang",
      alShaqeef: "Al-Shaqeef Zone",
      address: "Al-Shaqeef Industriezone, Aleppo, Syrien",
      companyName: "MSADDI.EST Metallverarbeitung"
    },
    accessibility: {
      contactWhatsApp: "Kontakt über WhatsApp",
      selectLanguage: "Sprache auswählen",
      toggleMenu: "Menü umschalten",
      mapTitle: "MSADDI.EST Standortkarte",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Werkstattbild"
    }
  },
  es: {
    whatsapp: {
      button: "WhatsApp",
      label: "Chatear en WhatsApp",
      tooltip: "Chatea con nosotros en WhatsApp",
      quickQuote: "Obtén presupuesto instantáneo y soporte",
      chatNow: "Iniciar chat",
      quickResponse: "Respuesta rápida garantizada",
      message: "Hola MSADDI.EST, estoy interesado en sus servicios de fabricación de metal."
    },
    theme: {
      lightMode: "Modo claro",
      darkMode: "Modo oscuro",
      switchTo: "Cambiar a"
    },
    map: {
      title: "Nuestra ubicación",
      getDirections: "Obtener direcciones",
      location: "Ubicación",
      zoneType: "Tipo de zona",
      industrialArea: "Área industrial",
      transportation: "Transporte",
      easyAccess: "Acceso fácil",
      alShaqeef: "Zona Al-Shaqeef",
      address: "Zona Industrial Al-Shaqeef, Alepo, Siria",
      companyName: "MSADDI.EST Fabricación de Metal"
    },
    accessibility: {
      contactWhatsApp: "Contacto en WhatsApp",
      selectLanguage: "Seleccionar idioma",
      toggleMenu: "Alternar menú",
      mapTitle: "Mapa de ubicación de MSADDI.EST",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Imagen del taller"
    }
  },
  it: {
    whatsapp: {
      button: "WhatsApp",
      label: "Chatta su WhatsApp",
      tooltip: "Chatta con noi su WhatsApp",
      quickQuote: "Ottieni preventivo istantaneo e supporto",
      chatNow: "Inizia chat",
      quickResponse: "Risposta rapida garantita",
      message: "Ciao MSADDI.EST, sono interessato ai vostri servizi di fabbricazione metalli."
    },
    theme: {
      lightMode: "Modalità chiara",
      darkMode: "Modalità scura",
      switchTo: "Passa a"
    },
    map: {
      title: "La nostra posizione",
      getDirections: "Ottieni indicazioni",
      location: "Posizione",
      zoneType: "Tipo di zona",
      industrialArea: "Area industriale",
      transportation: "Trasporto",
      easyAccess: "Accesso facile",
      alShaqeef: "Zona Al-Shaqeef",
      address: "Zona Industriale Al-Shaqeef, Aleppo, Siria",
      companyName: "MSADDI.EST Fabbricazione Metalli"
    },
    accessibility: {
      contactWhatsApp: "Contatto su WhatsApp",
      selectLanguage: "Seleziona lingua",
      toggleMenu: "Attiva/disattiva menu",
      mapTitle: "Mappa posizione MSADDI.EST",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Immagine officina"
    }
  },
  pt: {
    whatsapp: {
      button: "WhatsApp",
      label: "Conversar no WhatsApp",
      tooltip: "Converse conosco no WhatsApp",
      quickQuote: "Obtenha orçamento instantâneo e suporte",
      chatNow: "Iniciar conversa",
      quickResponse: "Resposta rápida garantida",
      message: "Olá MSADDI.EST, estou interessado em seus serviços de fabricação de metal."
    },
    theme: {
      lightMode: "Modo claro",
      darkMode: "Modo escuro",
      switchTo: "Mudar para"
    },
    map: {
      title: "Nossa localização",
      getDirections: "Obter direções",
      location: "Localização",
      zoneType: "Tipo de zona",
      industrialArea: "Área industrial",
      transportation: "Transporte",
      easyAccess: "Acesso fácil",
      alShaqeef: "Zona Al-Shaqeef",
      address: "Zona Industrial Al-Shaqeef, Aleppo, Síria",
      companyName: "MSADDI.EST Fabricação de Metais"
    },
    accessibility: {
      contactWhatsApp: "Contato no WhatsApp",
      selectLanguage: "Selecionar idioma",
      toggleMenu: "Alternar menu",
      mapTitle: "Mapa de localização MSADDI.EST",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Imagem da oficina"
    }
  },
  nl: {
    whatsapp: {
      button: "WhatsApp",
      label: "Chatten op WhatsApp",
      tooltip: "Chat met ons op WhatsApp",
      quickQuote: "Krijg direct offerte en ondersteuning",
      chatNow: "Start chat",
      quickResponse: "Snelle reactie gegarandeerd",
      message: "Hallo MSADDI.EST, ik ben geïnteresseerd in uw metaalbewerkingsdiensten."
    },
    theme: {
      lightMode: "Lichte modus",
      darkMode: "Donkere modus",
      switchTo: "Overschakelen naar"
    },
    map: {
      title: "Onze locatie",
      getDirections: "Route ophalen",
      location: "Locatie",
      zoneType: "Zone type",
      industrialArea: "Industriegebied",
      transportation: "Vervoer",
      easyAccess: "Gemakkelijke toegang",
      alShaqeef: "Al-Shaqeef Zone",
      address: "Al-Shaqeef Industriezone, Aleppo, Syrië",
      companyName: "MSADDI.EST Metaalbewerking"
    },
    accessibility: {
      contactWhatsApp: "Contact via WhatsApp",
      selectLanguage: "Taal selecteren",
      toggleMenu: "Menu schakelen",
      mapTitle: "MSADDI.EST Locatiekaart",
      companyLogo: "MSADDI.EST"
    },
    placeholders: {
      workshopImage: "Werkplaats afbeelding"
    }
  }
};

// Update common.json files for all languages
['en', 'ar', 'tr', 'fr', 'de', 'es', 'it', 'pt', 'nl'].forEach(lang => {
  const commonPath = path.join(__dirname, '..', 'locales', lang, 'common.json');

  try {
    const commonData = JSON.parse(fs.readFileSync(commonPath, 'utf-8'));

    // Merge new translations
    Object.assign(commonData, {
      ...commonData,
      ...commonTranslations[lang]
    });

    // Write back the updated file
    fs.writeFileSync(commonPath, JSON.stringify(commonData, null, 2), 'utf-8');
    console.log(`✅ Updated ${lang}/common.json with missing translations`);
  } catch (error) {
    console.log(`❌ Error updating ${lang}/common.json: ${error.message}`);
  }
});

// Create a report of components that need updating
const componentsToUpdate = `
=== COMPONENTS TO UPDATE ===

1. components/ui/whatsapp-button.tsx
   - Lines 31, 58-61, 79, 96, 102: Replace hardcoded text with translation keys
   - Use: t("whatsapp.tooltip"), t("whatsapp.quickQuote"), etc.

2. components/ui/google-map.tsx
   - Lines 30, 45, 54, 57, 85, 103-104, 118-119, 133-134: Replace hardcoded text
   - Use: t("map.address"), t("map.getDirections"), t("map.location"), etc.

3. components/ui/theme-switcher.tsx
   - Lines 39, 44: Replace "Light Mode" and "Dark Mode"
   - Use: t("theme.lightMode"), t("theme.darkMode")

4. components/sections/contact/contact-info.tsx
   - Lines 101-102, 110: Replace hardcoded WhatsApp text
   - Use: t("whatsapp.label"), t("whatsapp.quickResponse"), t("whatsapp.chatNow")

5. components/sections/home/about-section.tsx
   - Line 36: Replace "Workshop Image"
   - Use: t("placeholders.workshopImage")

6. components/layout/header.tsx
   - Line 77, 140: Replace alt and aria-label
   - Use: t("accessibility.companyLogo"), t("accessibility.toggleMenu")

7. components/layout/footer.tsx
   - Line 32: Replace alt text
   - Use: t("accessibility.companyLogo")

8. components/ui/language-switcher.tsx
   - Line 87: Replace aria-label
   - Use: t("accessibility.selectLanguage")

=== API RESPONSE MESSAGE ===
9. app/api/contact/route.ts
   - Line 152: Consider moving error message to translations
   - Or keep as is since it's a server-side API response
`;

// Save the report
fs.writeFileSync(
  path.join(__dirname, 'hardcoded-texts-report.txt'),
  componentsToUpdate,
  'utf-8'
);

console.log('\n📝 Report saved to scripts/hardcoded-texts-report.txt');
console.log('\n✅ All common.json files have been updated with missing translations!');
console.log('📌 Next step: Update the components listed in the report to use the new translation keys');