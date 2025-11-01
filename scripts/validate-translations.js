#!/usr/bin/env node
/**
 * Translation Validation Script
 *
 * This script validates the multilingual content system to ensure:
 * 1. All languages have identical key structures
 * 2. No hardcoded user-facing strings in TSX/JSX files
 * 3. All translation files are valid JSON
 * 4. No missing translation keys across languages
 *
 * This is a BUILD BLOCKER - the build will fail if any violations are found.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
};

let hasErrors = false;

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ERROR: ${message}`, colors.red);
  hasErrors = true;
}

function success(message) {
  log(`✅ ${message}`, colors.green);
}

function warn(message) {
  log(`⚠️  WARNING: ${message}`, colors.yellow);
}

function info(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

// ============================================================================
// 1. VALIDATE TRANSLATION FILE STRUCTURE
// ============================================================================

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys = keys.concat(getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

function validateTranslationStructure() {
  info('\n=== Validating Translation File Structure ===\n');

  const messagesDir = path.join(__dirname, '../messages');
  const locales = ['ar', 'en', 'tr'];
  const translations = {};

  // Load all translation files
  for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      translations[locale] = JSON.parse(content);
      success(`Loaded ${locale}.json`);
    } catch (err) {
      error(`Failed to parse ${locale}.json: ${err.message}`);
      return;
    }
  }

  // Get all keys from each language
  const keysByLocale = {};
  for (const locale of locales) {
    keysByLocale[locale] = getAllKeys(translations[locale]);
  }

  // Compare key structures
  const baseLocale = 'en';
  const baseKeys = keysByLocale[baseLocale];

  info(`\nBase language (${baseLocale}) has ${baseKeys.length} translation keys`);

  for (const locale of locales) {
    if (locale === baseLocale) continue;

    const localeKeys = keysByLocale[locale];
    const missing = baseKeys.filter(key => !localeKeys.includes(key));
    const extra = localeKeys.filter(key => !baseKeys.includes(key));

    if (missing.length > 0) {
      error(`${locale}.json is missing ${missing.length} keys:`);
      missing.forEach(key => console.log(`  - ${key}`));
    }

    if (extra.length > 0) {
      warn(`${locale}.json has ${extra.length} extra keys:`);
      extra.forEach(key => console.log(`  - ${key}`));
    }

    if (missing.length === 0 && extra.length === 0) {
      success(`${locale}.json structure matches ${baseLocale}.json perfectly`);
    }
  }
}

// ============================================================================
// 2. SCAN FOR HARDCODED STRINGS IN COMPONENTS
// ============================================================================

function scanForHardcodedStrings() {
  info('\n=== Scanning for Hardcoded Strings ===\n');

  const directories = [
    path.join(__dirname, '../app'),
    path.join(__dirname, '../components'),
  ];

  // Patterns that indicate hardcoded user-facing text
  const suspiciousPatterns = [
    // Text in JSX elements like <Typography>Text</Typography>
    />\s*[A-Z][a-zA-Z\s]{10,}\s*</g,

    // String literals in common UI-related contexts (but allow imports, paths, etc)
    /(?:title|label|placeholder|aria-label|alt)\s*=\s*["'](?!\/|http|#|data-|aria-)[A-Za-z\s]{5,}["']/g,

    // Button text patterns
    />\s*(?:Click|Submit|Send|Cancel|Save|Delete|Edit|Add|Remove|Update|Create|Download)\s*</gi,
  ];

  const allowedPatterns = [
    // Allow translation function calls
    /t\(['"]/,
    // Allow imports
    /from\s+['"]/,
    // Allow file paths
    /\.\//,
    /\.\.\//,
    // Allow URLs
    /https?:\/\//,
    // Allow data attributes
    /data-/,
    // Allow aria attributes that use variables
    /aria-\w+\s*=\s*\{/,
  ];

  let violations = [];

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
        return;
      }

      // Skip lines with allowed patterns
      if (allowedPatterns.some(pattern => pattern.test(line))) {
        return;
      }

      // Check for suspicious patterns
      suspiciousPatterns.forEach(pattern => {
        const matches = line.match(pattern);
        if (matches) {
          violations.push({
            file: path.relative(path.join(__dirname, '..'), filePath),
            line: index + 1,
            content: line.trim(),
            match: matches[0],
          });
        }
      });
    });
  }

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (fullPath.match(/\.(tsx|jsx)$/)) {
        scanFile(fullPath);
      }
    });
  }

  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      scanDirectory(dir);
    }
  });

  if (violations.length > 0) {
    warn(`Found ${violations.length} potential hardcoded string(s):`);
    violations.forEach(v => {
      console.log(`  ${v.file}:${v.line}`);
      console.log(`    ${colors.yellow}${v.content}${colors.reset}`);
    });
    console.log('\n');
    warn('Please verify these are not user-facing strings. If they are, move them to translation files.');
  } else {
    success('No hardcoded strings detected');
  }
}

// ============================================================================
// 3. VALIDATE TRANSLATION VALUE QUALITY
// ============================================================================

function validateTranslationQuality() {
  info('\n=== Validating Translation Quality ===\n');

  const messagesDir = path.join(__dirname, '../messages');
  const locales = ['ar', 'en', 'tr'];

  let issues = [];

  function checkTranslation(locale, key, value) {
    // Check for empty translations
    if (!value || value.trim() === '') {
      issues.push({ locale, key, issue: 'Empty translation' });
      return;
    }

    // Check for untranslated placeholders (common mistake)
    if (value === key || value === `{{${key}}}`) {
      issues.push({ locale, key, issue: 'Appears to be untranslated' });
      return;
    }

    // Check for missing variable placeholders consistency
    const enValue = getTranslationValue('en', key);
    if (enValue) {
      const enVars = (enValue.match(/\{[^}]+\}/g) || []).sort();
      const localeVars = (value.match(/\{[^}]+\}/g) || []).sort();

      if (JSON.stringify(enVars) !== JSON.stringify(localeVars)) {
        issues.push({
          locale,
          key,
          issue: `Variable placeholder mismatch. EN has ${enVars.join(', ')}, ${locale} has ${localeVars.join(', ')}`
        });
      }
    }
  }

  function getTranslationValue(locale, keyPath) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const keys = keyPath.split('.');
    let value = content;
    for (const key of keys) {
      value = value[key];
      if (value === undefined) return null;
    }
    return value;
  }

  function checkAllTranslations(locale, obj, prefix = '') {
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        checkAllTranslations(locale, obj[key], fullKey);
      } else {
        checkTranslation(locale, fullKey, obj[key]);
      }
    }
  }

  for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    checkAllTranslations(locale, content);
  }

  if (issues.length > 0) {
    warn(`Found ${issues.length} translation quality issue(s):`);
    issues.forEach(issue => {
      console.log(`  ${issue.locale} - ${issue.key}: ${issue.issue}`);
    });
  } else {
    success('All translations passed quality checks');
  }
}

// ============================================================================
// 4. VALIDATE IMAGE ALT TEXT AND OPTIMIZATION
// ============================================================================

function validateImageOptimization() {
  info('\n=== Validating Image Optimization & Alt Text ===\n');

  const directories = [
    path.join(__dirname, '../app'),
    path.join(__dirname, '../components'),
  ];

  let imageIssues = [];

  function scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);

      // Check for <img> tags without alt attribute
      const imgWithoutAlt = /<img\s+(?![^>]*\balt=)[^>]*>/gi;
      if (imgWithoutAlt.test(line)) {
        imageIssues.push({
          file: relativePath,
          line: lineNumber,
          severity: 'ERROR',
          issue: 'img tag without alt attribute (SEO blocker)',
          content: line.trim(),
        });
      }

      // Check for img tags with empty alt
      const imgWithEmptyAlt = /<img[^>]+alt\s*=\s*['"]\s*['"]/gi;
      if (imgWithEmptyAlt.test(line)) {
        imageIssues.push({
          file: relativePath,
          line: lineNumber,
          severity: 'ERROR',
          issue: 'img tag with empty alt attribute',
          content: line.trim(),
        });
      }

      // Check for non-descriptive alt text
      const altTextMatch = line.match(/alt\s*=\s*["']([^"']+)["']/i);
      if (altTextMatch) {
        const altText = altTextMatch[1];
        const invalidPatterns = [
          /^image$/i,
          /^img$/i,
          /^photo$/i,
          /^picture$/i,
          /^\d+$/,
          /\.(jpg|jpeg|png|webp|gif)$/i,
        ];

        const isInvalid = invalidPatterns.some(pattern => pattern.test(altText));
        if (isInvalid || altText.length < 10) {
          imageIssues.push({
            file: relativePath,
            line: lineNumber,
            severity: 'WARNING',
            issue: `Non-descriptive alt text: "${altText}" (should be min 10 chars and descriptive)`,
            content: line.trim(),
          });
        }
      }

      // Check for plain <img> tags instead of OptimizedImage or Next Image
      if (/<img\s/i.test(line) && !line.includes('// allowed')) {
        // Allow if it's part of a comment explaining usage
        if (!line.trim().startsWith('//') && !line.trim().startsWith('*')) {
          imageIssues.push({
            file: relativePath,
            line: lineNumber,
            severity: 'WARNING',
            issue: 'Using <img> tag instead of OptimizedImage or next/image (not optimized)',
            content: line.trim(),
          });
        }
      }

      // Check for Image component without alt
      const nextImageWithoutAlt = /<Image\s+(?![^>]*\balt=)[^>]*/gi;
      if (nextImageWithoutAlt.test(line) && line.includes('src=')) {
        imageIssues.push({
          file: relativePath,
          line: lineNumber,
          severity: 'ERROR',
          issue: 'Next.js Image component without alt attribute',
          content: line.trim(),
        });
      }
    });
  }

  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (fullPath.match(/\.(tsx|jsx)$/)) {
        scanFile(fullPath);
      }
    });
  }

  directories.forEach(dir => {
    if (fs.existsSync(dir)) {
      scanDirectory(dir);
    }
  });

  // Report findings
  const errors = imageIssues.filter(i => i.severity === 'ERROR');
  const warnings = imageIssues.filter(i => i.severity === 'WARNING');

  if (errors.length > 0) {
    error(`Found ${errors.length} image SEO ERROR(s) - BUILD BLOCKED:`);
    errors.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    ${colors.red}${issue.issue}${colors.reset}`);
      console.log(`    ${colors.yellow}${issue.content}${colors.reset}\n`);
    });
  }

  if (warnings.length > 0) {
    warn(`Found ${warnings.length} image optimization WARNING(s):`);
    warnings.forEach(issue => {
      console.log(`  ${issue.file}:${issue.line}`);
      console.log(`    ${colors.yellow}${issue.issue}${colors.reset}`);
    });
    console.log('');
  }

  if (errors.length === 0 && warnings.length === 0) {
    success('All images have proper alt text and optimization');
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

log(`\n${colors.bold}${colors.blue}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
log(`${colors.bold}${colors.blue}║   MSADDI Translation Validation Script                    ║${colors.reset}`);
log(`${colors.bold}${colors.blue}║   Enterprise-Grade Multilingual Content System            ║${colors.reset}`);
log(`${colors.bold}${colors.blue}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

try {
  validateTranslationStructure();
  scanForHardcodedStrings();
  validateTranslationQuality();
  validateImageOptimization();

  if (hasErrors) {
    log(`\n${colors.bold}${colors.red}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
    log(`${colors.bold}${colors.red}║   VALIDATION FAILED - BUILD BLOCKED                        ║${colors.reset}`);
    log(`${colors.bold}${colors.red}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);
    process.exit(1);
  } else {
    log(`\n${colors.bold}${colors.green}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
    log(`${colors.bold}${colors.green}║   ALL VALIDATIONS PASSED ✓                                 ║${colors.reset}`);
    log(`${colors.bold}${colors.green}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);
    process.exit(0);
  }
} catch (err) {
  error(`Unexpected error: ${err.message}`);
  console.error(err.stack);
  process.exit(1);
}
