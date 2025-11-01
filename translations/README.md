# MSADDI Translation System

**Enterprise-Grade Multilingual Content Management**

## Overview

This directory contains the translation infrastructure for the MSADDI website, implementing a zero-tolerance approach to hardcoded strings with build-time validation.

## Files

### 1. `glossary.json`
**Brand Terminology and Technical Terms**

Contains all brand-specific and technical terms that must be translated consistently across all languages.

**Key Features:**
- **Brand Terms**: Company name, slogans, taglines
- **Technical Terms**: Manufacturing processes, equipment names
- **Material Names**: Metals, alloys, specifications
- **Quality Terms**: Standards, certifications
- **Business Terms**: Quotes, consultations, delivery

**Usage:**
```javascript
// Always check glossary first when adding new translations
// Example: "CNC Bending" should always use the glossary term
// ar: "ثني CNC" (NOT "انحناء CNC" or other variations)
```

### 2. `translation-memory.json`
**Approved Translation Repository**

Stores all approved translations for reuse. Acts as a single source of truth for translated content.

**Key Features:**
- **Exact Match Reuse**: 100% matches reused directly
- **Fuzzy Matching**: 70-99% matches used as reference
- **Quality Metadata**: Approval status, confidence scores, approver info
- **Context Preservation**: Original context for each translation

**Usage:**
```javascript
// Before translating new content:
// 1. Search TM for exact or fuzzy matches
// 2. Reuse exact matches
// 3. Use fuzzy matches as reference
// 4. Add new approved translations to TM
```

### 3. `README.md` (this file)
Complete workflow documentation and guidelines.

---

## Multi-Engine Translation Workflow

### Required Translation Engines (Minimum 2)

Per the Arabic specification requirements, use at least 2 translation engines:

1. **Google Translate API** (Primary)
   - Best for: General content, marketing text
   - API: `@google-cloud/translate`
   - Confidence weight: 0.4

2. **DeepL API** (Technical Content)
   - Best for: Technical descriptions, specifications
   - API: `deepl-node`
   - Confidence weight: 0.35

3. **Microsoft Translator** (Formal Content)
   - Best for: Business communications, legal text
   - API: `@azure/ai-translator-text`
   - Confidence weight: 0.25

### Translation Process

#### Step 1: Check Glossary
```bash
# Always check if term exists in glossary first
grep -i "term_to_translate" translations/glossary.json
```

#### Step 2: Check Translation Memory
```bash
# Search for exact or similar translations
grep -i "text_to_translate" translations/translation-memory.json
```

#### Step 3: Multi-Engine Translation
```javascript
// Pseudo-code for multi-engine translation
async function translateText(text, targetLang) {
  // 1. Check glossary for exact matches
  const glossaryMatch = await checkGlossary(text);
  if (glossaryMatch) return glossaryMatch;

  // 2. Check TM for exact match
  const tmExactMatch = await checkTM(text, 'exact');
  if (tmExactMatch && tmExactMatch.approved) {
    return tmExactMatch.text;
  }

  // 3. Get translations from all engines
  const results = await Promise.all([
    googleTranslate(text, targetLang),
    deeplTranslate(text, targetLang),
    microsoftTranslate(text, targetLang)
  ]);

  // 4. Compare results and select best match
  const bestMatch = selectBestTranslation(results, {
    googleWeight: 0.4,
    deeplWeight: 0.35,
    microsoftWeight: 0.25
  });

  // 5. Human review (mandatory for critical content)
  const reviewed = await humanReview(bestMatch);

  // 6. Add to Translation Memory
  await addToTM(text, reviewed, targetLang);

  return reviewed;
}
```

#### Step 4: Human Review
- **Required for**: Brand content, technical specifications, CTAs
- **Optional for**: UI labels, generic messages
- **Reviewers**: Native speakers with domain expertise

#### Step 5: Quality Assurance
```bash
# Run validation script
npm run validate:translations

# Check for consistency
npm run check:consistency
```

---

## Language Negotiation Priority

As specified in requirements:

1. **User Preference Cookie** (Highest Priority)
   - Cookie name: `NEXT_LOCALE`
   - Persists user's explicit language choice

2. **Browser Accept-Language Header**
   - Automatic detection from browser settings

3. **URL Path Parameter**
   - `/ar/`, `/en/`, `/tr/` segments

4. **Default Language**
   - Fallback: Arabic (ar) for Syrian market
   - Fallback: English (en) for international

---

## Translation Guidelines

### General Rules

1. **Zero Hardcoded Strings**
   - ALL user-facing text must come from translation files
   - Build fails if violations detected

2. **Consistency First**
   - Always use glossary terms
   - Check TM before creating new translations

3. **Context Matters**
   - Same English text may need different translations in different contexts
   - Always include context in TM entries

4. **Technical Accuracy**
   - Numbers and measurements use Latin numerals in ALL languages (including Arabic)
   - Industry acronyms (CNC, ISO, etc.) remain in English
   - Material grades (304, 316, etc.) remain as numbers

### Arabic-Specific Guidelines

1. **Numbers in Arabic Content**
   ```
   ✅ Correct: "دقة تصل إلى ±0.127 مم"
   ❌ Wrong:   "دقة تصل إلى ±٠.١٢٧ مم"
   ```

2. **RTL Layout**
   - Text flows right-to-left
   - Numbers and technical specs remain LTR
   - Icons and UI elements mirror appropriately

3. **Formal vs. Informal**
   - Use formal Arabic (Modern Standard Arabic)
   - Avoid colloquialisms

### Turkish-Specific Guidelines

1. **Capitalization**
   - Turkish has different capitalization rules (İ/i, I/ı)
   - Pay special attention to brand names

2. **Technical Terms**
   - Many technical terms borrowed from English
   - Use localized versions from glossary

### English-Specific Guidelines

1. **American vs. British**
   - Use American English spelling consistently
   - aluminum (not aluminium)
   - optimize (not optimise)

2. **Technical Writing**
   - Clear, concise, professional tone
   - Active voice preferred

---

## Adding New Languages

To expand to additional languages (requirement: up to 10 languages without code changes):

### Step 1: Create Translation File
```bash
cp messages/en.json messages/[new_locale].json
```

### Step 2: Update i18n Configuration
```typescript
// i18n.ts
export const locales = ['ar', 'en', 'tr', 'new_locale'] as const;

export const localeConfig = {
  // ... existing configs
  new_locale: {
    label: 'Language Name',
    dir: 'ltr', // or 'rtl'
  },
};
```

### Step 3: Update Glossary
```json
// translations/glossary.json
{
  "terms": {
    "company": {
      "MSADDI EST.": {
        "ar": "...",
        "en": "...",
        "tr": "...",
        "new_locale": "..."
      }
    }
  }
}
```

### Step 4: Translate Content
Use multi-engine translation workflow for initial translation, then human review.

### Step 5: Validate
```bash
npm run validate:translations
```

---

## Build-Time Validation

### Automated Checks

The build process automatically runs `scripts/validate-translations.js` which checks:

1. **✅ Translation File Structure**
   - All languages have identical key structures
   - No missing or extra keys
   - Valid JSON syntax

2. **✅ Hardcoded String Detection**
   - Scans all TSX/JSX files
   - Flags potential hardcoded user-facing text
   - Allows technical attributes (aria-labels, etc.)

3. **✅ Translation Quality**
   - No empty translations
   - Variable placeholder consistency
   - No untranslated content

### Running Manually

```bash
# Validate all translations
npm run validate:translations

# Build (includes validation)
npm run build
```

### Expected Output

```
╔════════════════════════════════════════════════════════════╗
║   MSADDI Translation Validation Script                    ║
║   Enterprise-Grade Multilingual Content System            ║
╚════════════════════════════════════════════════════════════╝

=== Validating Translation File Structure ===
✅ Loaded ar.json
✅ Loaded en.json
✅ Loaded tr.json
✅ ar.json structure matches en.json perfectly
✅ tr.json structure matches en.json perfectly

=== Scanning for Hardcoded Strings ===
✅ No hardcoded strings detected

=== Validating Translation Quality ===
✅ All translations passed quality checks

╔════════════════════════════════════════════════════════════╗
║   ALL VALIDATIONS PASSED ✓                                 ║
╚════════════════════════════════════════════════════════════╝
```

---

## Google Translate Overlay Integration

### Optional Instant Translation

Per requirements, Google Translate overlay provides instant translation for:
- **Unsupported languages**: Languages not officially translated
- **User preference**: User manually enables overlay
- **SEO Safe**: `rel="nofollow"` prevents indexing

### Implementation

```html
<!-- Add to layout.tsx for overlay mode -->
<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'auto',
      includedLanguages: 'es,fr,de,it,pt,ru,zh-CN,ja,ko',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  }
</script>
<script type="text/javascript"
  src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
</script>
```

### Machine Translation Badge

When Google Translate overlay is active, display badge:

```tsx
{isMachineTranslation && (
  <Box sx={{ bgcolor: 'warning.light', p: 1, textAlign: 'center' }}>
    <Typography variant="caption">
      ⚠️ {t('common.machine_translation_notice')}
    </Typography>
  </Box>
)}
```

---

## Glossary Categories

### 1. Brand Terms
- Company names, slogans
- Never translate: MSADDI (brand name)
- Consistency critical

### 2. Technical Terms
- Manufacturing processes
- Equipment names
- Specifications
- High accuracy required

### 3. Material Names
- Metals and alloys
- Include grade numbers
- Technical precision

### 4. Quality Terms
- Standards (ISO, etc.)
- Certifications
- Inspection terminology

### 5. Business Terms
- Quotes, consultations
- Delivery terms
- Commercial vocabulary

---

## SEO Requirements

### Hreflang Tags
```html
<link rel="alternate" hreflang="ar" href="https://msaddi.com/ar" />
<link rel="alternate" hreflang="en" href="https://msaddi.com/en" />
<link rel="alternate" hreflang="tr" href="https://msaddi.com/tr" />
<link rel="alternate" hreflang="x-default" href="https://msaddi.com/ar" />
```

### Canonical URLs
Each language version has its own canonical URL.

### Structured Data
JSON-LD structured data localized per language in `components/StructuredData.tsx`.

---

## Troubleshooting

### Build Fails Due to Missing Translation

**Error:**
```
❌ ERROR: en.json is missing 1 keys:
  - services.new_service_title
```

**Solution:**
Add missing key to all language files:
```json
// messages/en.json
{
  "services": {
    "new_service_title": "New Service"
  }
}
```

### Hardcoded String Detected

**Warning:**
```
⚠️  WARNING: Found 1 potential hardcoded string(s):
  app/page.tsx:42
    <Typography>Hardcoded Text</Typography>
```

**Solution:**
1. Add translation key:
   ```json
   // messages/en.json
   "page": {
     "text": "Hardcoded Text"
   }
   ```

2. Use translation:
   ```tsx
   <Typography>{t('page.text')}</Typography>
   ```

### Translation Quality Issue

**Warning:**
```
⚠️  WARNING: ar - services.desc: Variable placeholder mismatch
```

**Solution:**
Ensure all languages have the same variable placeholders:
```json
// messages/en.json
"welcome": "Hello {name}, welcome to {company}"

// messages/ar.json (must have {name} and {company})
"welcome": "مرحباً {name}، أهلاً بك في {company}"
```

---

## Maintenance

### Regular Tasks

1. **Weekly**: Review TM additions, ensure quality
2. **Monthly**: Update glossary with new terms
3. **Quarterly**: Review and update translations for consistency
4. **Yearly**: Full translation audit and refresh

### Adding New Content

1. Write in English first (source language)
2. Check glossary for terms
3. Check TM for similar segments
4. Use multi-engine translation
5. Human review
6. Add to TM
7. Validate

---

## Support

For translation questions or issues:
- **Technical**: Check this README
- **Glossary Updates**: Review glossary.json
- **New Languages**: Follow "Adding New Languages" section
- **Build Errors**: Check validation script output

---

## Version History

- **v1.0.0** (2025-11-01): Initial translation system implementation
  - Zero tolerance hardcoded strings
  - Build-time validation
  - Glossary and TM creation
  - Multi-language support (ar, en, tr)
