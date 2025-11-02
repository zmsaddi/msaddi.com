const fs = require('fs');
const path = require('path');

// Service labels for all languages
const labels = {
  en: {
    "labels": {
      "features": "Features:",
      "applications": "Applications:",
      "process": "Our Process:"
    }
  },
  fr: {
    "labels": {
      "features": "Caractéristiques:",
      "applications": "Applications:",
      "process": "Notre processus:"
    }
  },
  de: {
    "labels": {
      "features": "Eigenschaften:",
      "applications": "Anwendungen:",
      "process": "Unser Prozess:"
    }
  },
  es: {
    "labels": {
      "features": "Características:",
      "applications": "Aplicaciones:",
      "process": "Nuestro proceso:"
    }
  },
  it: {
    "labels": {
      "features": "Caratteristiche:",
      "applications": "Applicazioni:",
      "process": "Il nostro processo:"
    }
  },
  pt: {
    "labels": {
      "features": "Características:",
      "applications": "Aplicações:",
      "process": "Nosso processo:"
    }
  },
  nl: {
    "labels": {
      "features": "Kenmerken:",
      "applications": "Toepassingen:",
      "process": "Ons proces:"
    }
  }
};

// Update each language's services.json
['en', 'fr', 'de', 'es', 'it', 'pt', 'nl'].forEach(lang => {
  const servicesPath = path.join(__dirname, '..', 'locales', lang, 'services.json');

  try {
    const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

    // Add labels if not present
    if (!servicesData.labels) {
      servicesData.labels = labels[lang].labels;
    }

    // Also need to ensure flanging has benefits array
    if (servicesData.services && servicesData.services.flanging && !servicesData.services.flanging.benefits) {
      const benefits = {
        en: [
          "Custom forming solutions",
          "Large diameter capabilities",
          "Various material grades",
          "Quality certified processes"
        ],
        fr: [
          "Solutions de formage personnalisées",
          "Capacités de grand diamètre",
          "Diverses qualités de matériaux",
          "Processus certifiés de qualité"
        ],
        de: [
          "Kundenspezifische Umformungslösungen",
          "Große Durchmesserfähigkeiten",
          "Verschiedene Materialgüten",
          "Qualitätszertifizierte Prozesse"
        ],
        es: [
          "Soluciones de conformado personalizadas",
          "Capacidades de gran diámetro",
          "Varios grados de material",
          "Procesos certificados de calidad"
        ],
        it: [
          "Soluzioni di formatura personalizzate",
          "Capacità di grande diametro",
          "Varie qualità di materiali",
          "Processi certificati di qualità"
        ],
        pt: [
          "Soluções de conformação personalizadas",
          "Capacidades de grande diâmetro",
          "Vários graus de material",
          "Processos certificados de qualidade"
        ],
        nl: [
          "Op maat gemaakte vormoplossingen",
          "Grote diameter mogelijkheden",
          "Verschillende materiaalkwaliteiten",
          "Kwaliteitsgecertificeerde processen"
        ]
      };
      servicesData.services.flanging.benefits = benefits[lang];
    }

    // Write back the updated file
    fs.writeFileSync(servicesPath, JSON.stringify(servicesData, null, 2), 'utf-8');
    console.log(`✅ Updated ${lang}/services.json with labels`);
  } catch (error) {
    console.log(`ℹ️ Skipping ${lang}/services.json: ${error.message}`);
  }
});

console.log('\n✅ Service labels added to all language files!');