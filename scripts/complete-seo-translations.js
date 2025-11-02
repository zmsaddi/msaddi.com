const fs = require('fs');
const path = require('path');

// Complete translations for all SEO languages
const translations = {
  es: {
    home: {
      "hero": {
        "title": "Servicios de Corte Láser de Precisión",
        "subtitle": "Excelencia en Fabricación de Chapa Metálica",
        "description": "Líder en fabricación de metales en Siria con corte láser avanzado hasta 40mm, plegado CNC 135T/3200mm y soluciones de chapa personalizadas para aplicaciones industriales",
        "cta1": "Obtener Presupuesto Gratuito",
        "cta2": "Ver Servicios",
        "stats": {
          "years": "30+ años",
          "yearsLabel": "Experiencia en fabricación de metales",
          "projects": "500+",
          "projectsLabel": "Proyectos industriales",
          "satisfaction": "99%",
          "satisfactionLabel": "Satisfacción del cliente"
        }
      },
      "about": {
        "title": "MSADDI.EST - Fabricación de Metales Siria",
        "subtitle": "Servicios líderes en fabricación de chapa y corte láser",
        "description": "MSADDI.EST especializada en fabricación industrial de metales, ofreciendo servicios de corte láser para acero inoxidable, aluminio, cobre y latón. Nuestras capacidades de corte láser 6000×2500mm y máquinas de plegado CNC 135T producen piezas metálicas precisas para las industrias de construcción, automotriz y manufactura en Alepo y Siria.",
        "features": {
          "quality": "Fabricación de metales certificada ISO 9001",
          "technology": "Tecnología de corte láser 40mm",
          "team": "Expertos en fabricación de metales",
          "delivery": "Entrega rápida y puntual"
        },
        "cta": "Descubrir nuestras capacidades"
      },
      "services": {
        "title": "Servicios de Fabricación de Metales",
        "subtitle": "Corte láser, plegado CNC y soluciones de chapa personalizadas",
        "learnMore": "Saber más"
      },
      "capabilities": {
        "title": "Capacidades Avanzadas de Procesamiento de Metales",
        "subtitle": "Corte láser 6000×2500mm y prensa CNC 135T",
        "description": "Instalación completa de fabricación de metales que procesa acero inoxidable hasta 40mm, placas de aluminio y piezas metálicas personalizadas con alta precisión para aplicaciones industriales"
      },
      "clients": {
        "title": "Socio confiable de fabricación de metales en Siria",
        "subtitle": "Sirviendo a las industrias de construcción, automotriz y manufactura con soluciones de chapa metálica de alta calidad"
      },
      "cta": {
        "title": "Comience su proyecto de fabricación de metales",
        "subtitle": "Obtenga presupuestos personalizados de corte láser y fabricación de chapa",
        "button": "Solicitar presupuesto gratuito"
      }
    }
  },
  it: {
    home: {
      "hero": {
        "title": "Servizi di Taglio Laser di Precisione",
        "subtitle": "Eccellenza nella Lavorazione della Lamiera",
        "description": "Leader nella lavorazione dei metalli in Siria con taglio laser avanzato fino a 40mm, piegatura CNC 135T/3200mm e soluzioni di lamiera personalizzate per applicazioni industriali",
        "cta1": "Richiedi Preventivo Gratuito",
        "cta2": "Visualizza Servizi",
        "stats": {
          "years": "30+ anni",
          "yearsLabel": "Esperienza nella lavorazione dei metalli",
          "projects": "500+",
          "projectsLabel": "Progetti industriali",
          "satisfaction": "99%",
          "satisfactionLabel": "Soddisfazione del cliente"
        }
      },
      "about": {
        "title": "MSADDI.EST - Lavorazione Metalli Siria",
        "subtitle": "Servizi leader di lavorazione lamiera e taglio laser",
        "description": "MSADDI.EST specializzata nella lavorazione industriale dei metalli, offre servizi di taglio laser per acciaio inossidabile, alluminio, rame e ottone. Le nostre capacità di taglio laser 6000×2500mm e macchine piegatrici CNC 135T producono parti metalliche precise per le industrie edili, automobilistiche e manifatturiere ad Aleppo e in Siria.",
        "features": {
          "quality": "Lavorazione metalli certificata ISO 9001",
          "technology": "Tecnologia di taglio laser 40mm",
          "team": "Esperti di lavorazione metalli",
          "delivery": "Consegna rapida e puntuale"
        },
        "cta": "Scopri le nostre capacità"
      },
      "services": {
        "title": "Servizi di Lavorazione Metalli",
        "subtitle": "Taglio laser, piegatura CNC e soluzioni lamiera personalizzate",
        "learnMore": "Scopri di più"
      },
      "capabilities": {
        "title": "Capacità Avanzate di Lavorazione Metalli",
        "subtitle": "Taglio laser 6000×2500mm e pressa CNC 135T",
        "description": "Impianto completo di lavorazione metalli che lavora acciaio inossidabile fino a 40mm, lastre di alluminio e parti metalliche personalizzate con alta precisione per applicazioni industriali"
      },
      "clients": {
        "title": "Partner affidabile per la lavorazione metalli in Siria",
        "subtitle": "Al servizio delle industrie edili, automobilistiche e manifatturiere con soluzioni di lamiera di alta qualità"
      },
      "cta": {
        "title": "Inizia il tuo progetto di lavorazione metalli",
        "subtitle": "Ottieni preventivi personalizzati per taglio laser e lavorazione lamiera",
        "button": "Richiedi preventivo gratuito"
      }
    }
  },
  pt: {
    home: {
      "hero": {
        "title": "Serviços de Corte a Laser de Precisão",
        "subtitle": "Excelência em Fabricação de Chapa Metálica",
        "description": "Líder em fabricação de metais na Síria com corte a laser avançado até 40mm, dobra CNC 135T/3200mm e soluções de chapa personalizadas para aplicações industriais",
        "cta1": "Obter Orçamento Grátis",
        "cta2": "Ver Serviços",
        "stats": {
          "years": "30+ anos",
          "yearsLabel": "Experiência em fabricação de metais",
          "projects": "500+",
          "projectsLabel": "Projetos industriais",
          "satisfaction": "99%",
          "satisfactionLabel": "Satisfação do cliente"
        }
      },
      "about": {
        "title": "MSADDI.EST - Fabricação de Metais Síria",
        "subtitle": "Serviços líderes em fabricação de chapa e corte a laser",
        "description": "MSADDI.EST especializada em fabricação industrial de metais, oferecendo serviços de corte a laser para aço inoxidável, alumínio, cobre e latão. Nossas capacidades de corte a laser 6000×2500mm e máquinas de dobra CNC 135T produzem peças metálicas precisas para as indústrias de construção, automotiva e manufatura em Aleppo e Síria.",
        "features": {
          "quality": "Fabricação de metais certificada ISO 9001",
          "technology": "Tecnologia de corte a laser 40mm",
          "team": "Especialistas em fabricação de metais",
          "delivery": "Entrega rápida e pontual"
        },
        "cta": "Descobrir nossas capacidades"
      },
      "services": {
        "title": "Serviços de Fabricação de Metais",
        "subtitle": "Corte a laser, dobra CNC e soluções de chapa personalizadas",
        "learnMore": "Saber mais"
      },
      "capabilities": {
        "title": "Capacidades Avançadas de Processamento de Metais",
        "subtitle": "Corte a laser 6000×2500mm e prensa CNC 135T",
        "description": "Instalação completa de fabricação de metais que processa aço inoxidável até 40mm, placas de alumínio e peças metálicas personalizadas com alta precisão para aplicações industriais"
      },
      "clients": {
        "title": "Parceiro confiável de fabricação de metais na Síria",
        "subtitle": "Atendendo às indústrias de construção, automotiva e manufatura com soluções de chapa metálica de alta qualidade"
      },
      "cta": {
        "title": "Comece seu projeto de fabricação de metais",
        "subtitle": "Obtenha orçamentos personalizados de corte a laser e fabricação de chapa",
        "button": "Solicitar orçamento grátis"
      }
    }
  },
  nl: {
    home: {
      "hero": {
        "title": "Precisie Lasersnijdiensten",
        "subtitle": "Excellentie in Plaatbewerking",
        "description": "Leider in metaalbewerking in Syrië met geavanceerd lasersnijden tot 40mm, CNC buigen 135T/3200mm en op maat gemaakte plaatoplossingen voor industriële toepassingen",
        "cta1": "Gratis Offerte Aanvragen",
        "cta2": "Bekijk Diensten",
        "stats": {
          "years": "30+ jaar",
          "yearsLabel": "Ervaring in metaalbewerking",
          "projects": "500+",
          "projectsLabel": "Industriële projecten",
          "satisfaction": "99%",
          "satisfactionLabel": "Klanttevredenheid"
        }
      },
      "about": {
        "title": "MSADDI.EST - Metaalbewerking Syrië",
        "subtitle": "Toonaangevende plaatbewerking en lasersnijdiensten",
        "description": "MSADDI.EST gespecialiseerd in industriële metaalbewerking, biedt lasersnijdiensten voor roestvrij staal, aluminium, koper en messing. Onze lasersnijcapaciteiten van 6000×2500mm en CNC buigmachines 135T produceren nauwkeurige metalen onderdelen voor de bouw-, automobiel- en productie-industrieën in Aleppo en Syrië.",
        "features": {
          "quality": "ISO 9001 gecertificeerde metaalbewerking",
          "technology": "40mm lasersnij technologie",
          "team": "Metaalbewerking experts",
          "delivery": "Snelle en tijdige levering"
        },
        "cta": "Ontdek onze mogelijkheden"
      },
      "services": {
        "title": "Metaalbewerking Diensten",
        "subtitle": "Lasersnijden, CNC buigen en op maat gemaakte plaatoplossingen",
        "learnMore": "Meer informatie"
      },
      "capabilities": {
        "title": "Geavanceerde Metaalverwerkingsmogelijkheden",
        "subtitle": "Lasersnijden 6000×2500mm en CNC pers 135T",
        "description": "Volledige metaalbewerkingsfaciliteit die roestvrij staal tot 40mm, aluminium platen en op maat gemaakte metalen onderdelen met hoge precisie verwerkt voor industriële toepassingen"
      },
      "clients": {
        "title": "Betrouwbare metaalbewerkingspartner in Syrië",
        "subtitle": "Bedient bouw-, automobiel- en productie-industrieën met hoogwaardige plaatoplossingen"
      },
      "cta": {
        "title": "Start uw metaalbewerkingsproject",
        "subtitle": "Ontvang op maat gemaakte offertes voor lasersnijden en plaatbewerking",
        "button": "Vraag gratis offerte aan"
      }
    }
  },
  de: {
    home: {
      "hero": {
        "title": "Präzisions-Laserschneiddienste",
        "subtitle": "Exzellenz in der Blechbearbeitung",
        "description": "Führend in der Metallverarbeitung in Syrien mit fortschrittlichem Laserschneiden bis 40mm, CNC-Biegen 135T/3200mm und maßgeschneiderten Blechlösungen für industrielle Anwendungen",
        "cta1": "Kostenloses Angebot Anfordern",
        "cta2": "Dienste Ansehen",
        "stats": {
          "years": "30+ Jahre",
          "yearsLabel": "Erfahrung in der Metallverarbeitung",
          "projects": "500+",
          "projectsLabel": "Industrieprojekte",
          "satisfaction": "99%",
          "satisfactionLabel": "Kundenzufriedenheit"
        }
      },
      "about": {
        "title": "MSADDI.EST - Metallverarbeitung Syrien",
        "subtitle": "Führende Blechbearbeitung und Laserschneiddienste",
        "description": "MSADDI.EST spezialisiert auf industrielle Metallverarbeitung, bietet Laserschneiddienste für Edelstahl, Aluminium, Kupfer und Messing. Unsere Laserschneidkapazitäten von 6000×2500mm und CNC-Biegemaschinen 135T produzieren präzise Metallteile für die Bau-, Automobil- und Fertigungsindustrie in Aleppo und Syrien.",
        "features": {
          "quality": "ISO 9001 zertifizierte Metallverarbeitung",
          "technology": "40mm Laserschneidtechnologie",
          "team": "Metallverarbeitungsexperten",
          "delivery": "Schnelle und pünktliche Lieferung"
        },
        "cta": "Unsere Fähigkeiten entdecken"
      },
      "services": {
        "title": "Metallverarbeitungsdienste",
        "subtitle": "Laserschneiden, CNC-Biegen und maßgeschneiderte Blechlösungen",
        "learnMore": "Mehr erfahren"
      },
      "capabilities": {
        "title": "Fortschrittliche Metallverarbeitungsfähigkeiten",
        "subtitle": "Laserschneiden 6000×2500mm und CNC-Presse 135T",
        "description": "Vollständige Metallverarbeitungsanlage, die Edelstahl bis 40mm, Aluminiumplatten und maßgeschneiderte Metallteile mit hoher Präzision für industrielle Anwendungen verarbeitet"
      },
      "clients": {
        "title": "Zuverlässiger Metallverarbeitungspartner in Syrien",
        "subtitle": "Bedient Bau-, Automobil- und Fertigungsindustrie mit hochwertigen Blechlösungen"
      },
      "cta": {
        "title": "Starten Sie Ihr Metallverarbeitungsprojekt",
        "subtitle": "Erhalten Sie maßgeschneiderte Angebote für Laserschneiden und Blechbearbeitung",
        "button": "Kostenloses Angebot anfordern"
      }
    }
  }
};

// Update each language's home.json
Object.keys(translations).forEach(lang => {
  const homePath = path.join(__dirname, '..', 'locales', lang, 'home.json');

  // Write the complete home.json file
  fs.writeFileSync(homePath, JSON.stringify(translations[lang].home, null, 2), 'utf-8');
  console.log(`✅ Updated ${lang}/home.json with complete translations`);
});

console.log('\n✅ All SEO language home.json files have been completed with proper translations!');