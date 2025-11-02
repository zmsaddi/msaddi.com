const fs = require('fs');
const path = require('path');

// Update each language's services.json
['en', 'ar', 'tr', 'fr', 'de', 'es', 'it', 'pt', 'nl'].forEach(lang => {
  const servicesPath = path.join(__dirname, '..', 'locales', lang, 'services.json');

  try {
    const servicesData = JSON.parse(fs.readFileSync(servicesPath, 'utf-8'));

    // Check if labels exists at root level
    if (servicesData.labels && !servicesData.services.labels) {
      // Move labels into services section
      servicesData.services.labels = servicesData.labels;

      // Remove labels from root level
      delete servicesData.labels;

      // Write back the updated file
      fs.writeFileSync(servicesPath, JSON.stringify(servicesData, null, 2), 'utf-8');
      console.log(`✅ Updated ${lang}/services.json - moved labels into services section`);
    } else if (servicesData.services.labels) {
      console.log(`ℹ️  ${lang}/services.json - labels already in correct location`);
    }
  } catch (error) {
    console.log(`❌ Error updating ${lang}/services.json: ${error.message}`);
  }
});

console.log('\n✅ All services.json files updated!');
