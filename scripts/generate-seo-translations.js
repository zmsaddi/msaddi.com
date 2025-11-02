const fs = require('fs');
const path = require('path');

// Translation data for all SEO languages
const translations = {
  fr: {
    contact: {
      page: {
        title: "Contactez MSADDI - Devis Fabrication Métallique",
        subtitle: "Obtenez un devis pour vos projets de découpe laser et pliage"
      },
      form: {
        title: "Demande de Devis",
        name: { label: "Nom", placeholder: "Votre nom" },
        email: { label: "Email", placeholder: "votre@email.com" },
        phone: { label: "Téléphone", placeholder: "+33..." },
        subject: { label: "Sujet", placeholder: "Objet de votre demande" },
        message: { label: "Message", placeholder: "Décrivez votre projet..." },
        submit: "Envoyer"
      },
      info: {
        title: "Informations de Contact",
        items: {
          email: { label: "Email", value: "info@msaddi.com" },
          phone: { label: "Téléphone", value: "+963 944 244 604" },
          address: { label: "Adresse", value: "Zone industrielle Al-Shaqeef, Alep, Syrie" }
        }
      },
      map: { title: "Notre Localisation" }
    },
    privacy: {
      title: "Politique de Confidentialité",
      lastUpdated: "Dernière mise à jour",
      sections: {
        intro: { title: "Introduction", content: "MSADDI.EST respecte votre vie privée." },
        data: { title: "Données Collectées", content: "Nous collectons uniquement les données nécessaires." },
        usage: { title: "Utilisation", content: "Vos données sont utilisées pour améliorer nos services." },
        security: { title: "Sécurité", content: "Nous protégeons vos informations." }
      }
    },
    terms: {
      title: "Conditions d'Utilisation",
      lastUpdated: "Dernière mise à jour",
      sections: {
        acceptance: { title: "Acceptation", content: "En utilisant ce site, vous acceptez nos conditions." },
        services: { title: "Services", content: "MSADDI.EST fournit des services de fabrication métallique." },
        liability: { title: "Responsabilité", content: "Limitation de responsabilité selon la loi applicable." }
      }
    }
  },
  de: {
    common: {
      nav: {
        home: "Startseite", services: "Dienstleistungen", about: "Über uns", contact: "Kontakt",
        requestQuote: "Angebot anfordern", language: "Sprache"
      },
      footer: {
        companyDescription: "MSADDI.EST - Führender Blechverarbeiter mit über 30 Jahren Erfahrung.",
        location: "Al-Shaqeef Industriezone, Aleppo, Syrien",
        email: "E-Mail", phone: "Telefon", address: "Adresse"
      }
    },
    home: {
      hero: {
        title: "MSADDI.EST - Laserschneiden und Blechverarbeitung in Syrien",
        subtitle: "Führender Anbieter von Präzisions-Laserschneiden und CNC-Biegen seit 1994",
        description: "Spezialist für Laserschneiden bis 40mm, 135T Biegen und maßgeschneiderte Fertigung."
      }
    },
    services: {
      page: { title: "Laserschneiden und CNC-Biegen Dienstleistungen - MSADDI.EST" },
      services: {
        laserCutting: { title: "Laserschneiden", description: "Hochpräzises Laserschneiden bis 40mm Stahl" },
        bending: { title: "CNC-Biegen", description: "135T Abkantpresse für präzises Biegen" },
        flanging: { title: "Bördeln & Wölben", description: "Spezialisiert auf Tankköpfe und Silos" },
        custom: { title: "Maßanfertigung", description: "Komplette Blechverarbeitungslösungen" }
      }
    },
    about: {
      page: { title: "Über MSADDI - Blechverarbeitung Syrien" },
      intro: { title: "Über 30 Jahre Exzellenz in der Metallverarbeitung" }
    },
    contact: {
      page: { title: "Kontakt MSADDI - Angebot Blechverarbeitung" },
      form: { title: "Angebotsanfrage", submit: "Senden" }
    },
    privacy: { title: "Datenschutzerklärung" },
    terms: { title: "Nutzungsbedingungen" }
  },
  es: {
    common: {
      nav: {
        home: "Inicio", services: "Servicios", about: "Nosotros", contact: "Contacto",
        requestQuote: "Solicitar presupuesto", language: "Idioma"
      },
      footer: {
        companyDescription: "MSADDI.EST - Líder en fabricación de chapa metálica con más de 30 años.",
        location: "Zona Industrial Al-Shaqeef, Alepo, Siria"
      }
    },
    home: {
      hero: {
        title: "MSADDI.EST - Corte Láser y Fabricación Metálica en Siria",
        subtitle: "Líder en corte láser de precisión y plegado CNC desde 1994"
      }
    },
    services: {
      services: {
        laserCutting: { title: "Corte Láser", description: "Corte láser hasta 40mm acero" },
        bending: { title: "Plegado CNC", description: "Prensa plegadora 135T" },
        flanging: { title: "Rebordeado", description: "Cabezales de tanques y silos" },
        custom: { title: "Fabricación a Medida", description: "Soluciones completas" }
      }
    }
  },
  it: {
    common: {
      nav: {
        home: "Home", services: "Servizi", about: "Chi siamo", contact: "Contatti",
        requestQuote: "Richiedi preventivo", language: "Lingua"
      },
      footer: {
        companyDescription: "MSADDI.EST - Leader nella lavorazione lamiere con oltre 30 anni.",
        location: "Zona Industriale Al-Shaqeef, Aleppo, Siria"
      }
    },
    home: {
      hero: {
        title: "MSADDI.EST - Taglio Laser e Lavorazione Lamiere in Siria",
        subtitle: "Leader nel taglio laser di precisione e piegatura CNC dal 1994"
      }
    },
    services: {
      services: {
        laserCutting: { title: "Taglio Laser", description: "Taglio laser fino a 40mm acciaio" },
        bending: { title: "Piegatura CNC", description: "Pressa piegatrice 135T" },
        flanging: { title: "Flangiatura", description: "Fondi per serbatoi e silos" },
        custom: { title: "Fabbricazione su Misura", description: "Soluzioni complete" }
      }
    }
  },
  pt: {
    common: {
      nav: {
        home: "Início", services: "Serviços", about: "Sobre", contact: "Contato",
        requestQuote: "Solicitar orçamento", language: "Idioma"
      },
      footer: {
        companyDescription: "MSADDI.EST - Líder em fabricação de chapas metálicas com mais de 30 anos.",
        location: "Zona Industrial Al-Shaqeef, Alepo, Síria"
      }
    },
    home: {
      hero: {
        title: "MSADDI.EST - Corte a Laser e Fabricação Metálica na Síria",
        subtitle: "Líder em corte a laser de precisão e dobra CNC desde 1994"
      }
    },
    services: {
      services: {
        laserCutting: { title: "Corte a Laser", description: "Corte a laser até 40mm aço" },
        bending: { title: "Dobra CNC", description: "Prensa dobradeira 135T" },
        flanging: { title: "Flangeamento", description: "Tampos de tanques e silos" },
        custom: { title: "Fabricação Personalizada", description: "Soluções completas" }
      }
    }
  },
  nl: {
    common: {
      nav: {
        home: "Home", services: "Diensten", about: "Over ons", contact: "Contact",
        requestQuote: "Offerte aanvragen", language: "Taal"
      },
      footer: {
        companyDescription: "MSADDI.EST - Leider in plaatbewerking met meer dan 30 jaar ervaring.",
        location: "Al-Shaqeef Industriezone, Aleppo, Syrië"
      }
    },
    home: {
      hero: {
        title: "MSADDI.EST - Lasersnijden en Metaalbewerking in Syrië",
        subtitle: "Leider in precisie lasersnijden en CNC buigen sinds 1994"
      }
    },
    services: {
      services: {
        laserCutting: { title: "Lasersnijden", description: "Lasersnijden tot 40mm staal" },
        bending: { title: "CNC Buigen", description: "Kantpers 135T" },
        flanging: { title: "Flensen", description: "Tankbodems en silo's" },
        custom: { title: "Maatwerk", description: "Complete oplossingen" }
      }
    }
  }
};

// Create all translation files
function createTranslationFiles() {
  const languages = ['fr', 'de', 'es', 'it', 'pt', 'nl'];
  const baseFiles = ['contact', 'privacy', 'terms'];

  languages.forEach(lang => {
    const localeDir = path.join(__dirname, '..', 'locales', lang);

    // Create missing base files
    baseFiles.forEach(file => {
      const filePath = path.join(localeDir, `${file}.json`);
      if (!fs.existsSync(filePath)) {
        let content = {};

        if (file === 'contact' && translations[lang]?.contact) {
          content = translations[lang].contact;
        } else if (file === 'privacy' && translations[lang]?.privacy) {
          content = translations[lang].privacy;
        } else if (file === 'terms' && translations[lang]?.terms) {
          content = translations[lang].terms;
        } else {
          // Create minimal fallback content
          content = {
            title: file.charAt(0).toUpperCase() + file.slice(1),
            content: `${file} page for MSADDI.EST`
          };
        }

        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`✅ Created ${lang}/${file}.json`);
      }
    });

    // Create missing common.json for other languages
    if (lang !== 'fr' && !fs.existsSync(path.join(localeDir, 'common.json'))) {
      const content = translations[lang]?.common || {
        nav: { home: "Home", services: "Services", about: "About", contact: "Contact" },
        footer: { companyDescription: "MSADDI.EST Metal Fabrication", location: "Aleppo, Syria" }
      };
      fs.writeFileSync(path.join(localeDir, 'common.json'), JSON.stringify(content, null, 2));
      console.log(`✅ Created ${lang}/common.json`);
    }

    // Create missing home.json for other languages
    if (lang !== 'fr' && !fs.existsSync(path.join(localeDir, 'home.json'))) {
      const content = translations[lang]?.home || {
        hero: { title: "MSADDI.EST", subtitle: "Metal Fabrication" }
      };
      fs.writeFileSync(path.join(localeDir, 'home.json'), JSON.stringify(content, null, 2));
      console.log(`✅ Created ${lang}/home.json`);
    }

    // Create missing services.json for other languages
    if (lang !== 'fr' && !fs.existsSync(path.join(localeDir, 'services.json'))) {
      const content = translations[lang]?.services || {
        page: { title: "Services" },
        services: { laserCutting: { title: "Laser Cutting" } }
      };
      fs.writeFileSync(path.join(localeDir, 'services.json'), JSON.stringify(content, null, 2));
      console.log(`✅ Created ${lang}/services.json`);
    }

    // Create missing about.json for other languages
    if (lang !== 'fr' && !fs.existsSync(path.join(localeDir, 'about.json'))) {
      const content = translations[lang]?.about || {
        page: { title: "About MSADDI" },
        intro: { title: "Excellence in Metal Fabrication" }
      };
      fs.writeFileSync(path.join(localeDir, 'about.json'), JSON.stringify(content, null, 2));
      console.log(`✅ Created ${lang}/about.json`);
    }
  });

  console.log('\n🎉 All SEO translation files created successfully!');
}

// Run the script
createTranslationFiles();