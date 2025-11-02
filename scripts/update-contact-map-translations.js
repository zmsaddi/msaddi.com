const fs = require('fs');
const path = require('path');

// Map translations for all languages
const mapTranslations = {
  en: {
    address: "Al-Shaqeef Industrial Zone, Aleppo, Syria",
    companyName: "MSADDI.EST Metal Fabrication",
    getDirections: "Get Directions",
    location: "Location",
    alShaqeef: "Al-Shaqeef Zone",
    zoneType: "Zone Type",
    industrialArea: "Industrial Area",
    transportation: "Transportation",
    easyAccess: "Easy Access"
  },
  ar: {
    address: "منطقة الشقيف الصناعية، حلب، سوريا",
    companyName: "MSADDI.EST لتصنيع المعادن",
    getDirections: "الحصول على الاتجاهات",
    location: "الموقع",
    alShaqeef: "منطقة الشقيف",
    zoneType: "نوع المنطقة",
    industrialArea: "منطقة صناعية",
    transportation: "المواصلات",
    easyAccess: "وصول سهل"
  },
  tr: {
    address: "Al-Shaqeef Endüstri Bölgesi, Halep, Suriye",
    companyName: "MSADDI.EST Metal İşleme",
    getDirections: "Yol Tarifi Al",
    location: "Konum",
    alShaqeef: "Al-Shaqeef Bölgesi",
    zoneType: "Bölge Türü",
    industrialArea: "Endüstri Bölgesi",
    transportation: "Ulaşım",
    easyAccess: "Kolay Erişim"
  },
  fr: {
    address: "Zone industrielle d'Al-Shaqeef, Alep, Syrie",
    companyName: "MSADDI.EST Fabrication Métallique",
    getDirections: "Obtenir l'itinéraire",
    location: "Emplacement",
    alShaqeef: "Zone d'Al-Shaqeef",
    zoneType: "Type de zone",
    industrialArea: "Zone industrielle",
    transportation: "Transport",
    easyAccess: "Accès facile"
  },
  de: {
    address: "Al-Shaqeef Industriegebiet, Aleppo, Syrien",
    companyName: "MSADDI.EST Metallverarbeitung",
    getDirections: "Route abrufen",
    location: "Standort",
    alShaqeef: "Al-Shaqeef Zone",
    zoneType: "Zonentyp",
    industrialArea: "Industriegebiet",
    transportation: "Transport",
    easyAccess: "Einfacher Zugang"
  },
  es: {
    address: "Zona Industrial Al-Shaqeef, Alepo, Siria",
    companyName: "MSADDI.EST Fabricación de Metal",
    getDirections: "Obtener direcciones",
    location: "Ubicación",
    alShaqeef: "Zona Al-Shaqeef",
    zoneType: "Tipo de zona",
    industrialArea: "Zona industrial",
    transportation: "Transporte",
    easyAccess: "Fácil acceso"
  },
  it: {
    address: "Zona Industriale Al-Shaqeef, Aleppo, Siria",
    companyName: "MSADDI.EST Fabbricazione Metalli",
    getDirections: "Ottieni indicazioni",
    location: "Posizione",
    alShaqeef: "Zona Al-Shaqeef",
    zoneType: "Tipo di zona",
    industrialArea: "Zona industriale",
    transportation: "Trasporto",
    easyAccess: "Facile accesso"
  },
  pt: {
    address: "Zona Industrial Al-Shaqeef, Alepo, Síria",
    companyName: "MSADDI.EST Fabricação de Metal",
    getDirections: "Obter direções",
    location: "Localização",
    alShaqeef: "Zona Al-Shaqeef",
    zoneType: "Tipo de zona",
    industrialArea: "Zona industrial",
    transportation: "Transporte",
    easyAccess: "Acesso fácil"
  },
  nl: {
    address: "Al-Shaqeef Industriezone, Aleppo, Syrië",
    companyName: "MSADDI.EST Metaalbewerking",
    getDirections: "Routebeschrijving",
    location: "Locatie",
    alShaqeef: "Al-Shaqeef Zone",
    zoneType: "Zonetype",
    industrialArea: "Industriezone",
    transportation: "Transport",
    easyAccess: "Gemakkelijke toegang"
  }
};

// Accessibility translations
const accessibilityTranslations = {
  en: { mapTitle: "MSADDI.EST Location Map" },
  ar: { mapTitle: "خريطة موقع MSADDI.EST" },
  tr: { mapTitle: "MSADDI.EST Konum Haritası" },
  fr: { mapTitle: "Carte de localisation MSADDI.EST" },
  de: { mapTitle: "MSADDI.EST Standortkarte" },
  es: { mapTitle: "Mapa de ubicación MSADDI.EST" },
  it: { mapTitle: "Mappa della posizione MSADDI.EST" },
  pt: { mapTitle: "Mapa de localização MSADDI.EST" },
  nl: { mapTitle: "MSADDI.EST Locatiekaart" }
};

// Update each language's contact.json
['en', 'ar', 'tr', 'fr', 'de', 'es', 'it', 'pt', 'nl'].forEach(lang => {
  const contactPath = path.join(__dirname, '..', 'locales', lang, 'contact.json');

  try {
    const contactData = JSON.parse(fs.readFileSync(contactPath, 'utf-8'));

    // Update map section with additional translations
    contactData.map = {
      ...contactData.map,
      ...mapTranslations[lang]
    };

    // Add accessibility section
    contactData.accessibility = accessibilityTranslations[lang];

    // Write back the updated file
    fs.writeFileSync(contactPath, JSON.stringify(contactData, null, 2), 'utf-8');
    console.log(`✅ Updated ${lang}/contact.json - added map and accessibility translations`);
  } catch (error) {
    console.log(`❌ Error updating ${lang}/contact.json: ${error.message}`);
  }
});

console.log('\n✅ All contact.json files updated with map translations!');
