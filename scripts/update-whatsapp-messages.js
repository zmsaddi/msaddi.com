const fs = require('fs');
const path = require('path');

// Professional WhatsApp messages without company name
const messages = {
  tr: "Merhaba, metal fabrikasyon hizmetlerinizle ilgileniyorum.",
  fr: "Bonjour, je suis intéressé par vos services de fabrication métallique.",
  de: "Hallo, ich interessiere mich für Ihre Metallverarbeitungsdienste.",
  es: "Hola, estoy interesado en sus servicios de fabricación de metal.",
  it: "Salve, sono interessato ai vostri servizi di fabbricazione metalli.",
  pt: "Olá, estou interessado em seus serviços de fabricação de metal.",
  nl: "Hallo, ik ben geïnteresseerd in uw metaalbewerkingsdiensten."
};

// Update each language's common.json
Object.keys(messages).forEach(lang => {
  const commonPath = path.join(__dirname, '..', 'locales', lang, 'common.json');

  try {
    const commonData = JSON.parse(fs.readFileSync(commonPath, 'utf-8'));

    // Update WhatsApp message
    if (commonData.whatsapp && commonData.whatsapp.message) {
      commonData.whatsapp.message = messages[lang];
    }

    // Write back the updated file
    fs.writeFileSync(commonPath, JSON.stringify(commonData, null, 2), 'utf-8');
    console.log(`✅ Updated ${lang}/common.json - WhatsApp message`);
  } catch (error) {
    console.log(`❌ Error updating ${lang}/common.json: ${error.message}`);
  }
});

console.log('\n✅ All WhatsApp messages updated to be professional without company name!');
