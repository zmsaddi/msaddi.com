/**
 * Lighthouse Audit Script
 *
 * Measures baseline performance metrics before rebuild
 * Tests all critical pages across all locales
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

// Pages to audit
const PAGES = [
  { path: '/', name: 'home' },
  { path: '/about', name: 'about' },
  { path: '/services', name: 'services' },
  { path: '/products', name: 'products' },
  { path: '/capabilities', name: 'capabilities' },
  { path: '/contact', name: 'contact' },
];

// Locales to test
const LOCALES = ['ar', 'en', 'tr'];

// Base URL
const BASE_URL = process.env.AUDIT_URL || 'http://localhost:3000';

// Lighthouse config
const CONFIG = {
  extends: 'lighthouse:default',
  settings: {
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    formFactor: 'mobile',
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
    },
    screenEmulation: {
      mobile: true,
      width: 375,
      height: 667,
      deviceScaleFactor: 2,
    },
  },
};

async function launchChromeAndRunLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  opts.port = chrome.port;
  const results = await lighthouse(url, opts, config);
  await chrome.kill();
  return results;
}

async function auditPage(locale, page) {
  const url = `${BASE_URL}/${locale}${page.path}`;
  console.log(`\n🔍 Auditing: ${url}`);

  try {
    const results = await launchChromeAndRunLighthouse(url, {}, CONFIG);
    const { lhr } = results;

    return {
      url,
      locale,
      page: page.name,
      timestamp: new Date().toISOString(),
      scores: {
        performance: Math.round(lhr.categories.performance.score * 100),
        accessibility: Math.round(lhr.categories.accessibility.score * 100),
        bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
        seo: Math.round(lhr.categories.seo.score * 100),
      },
      metrics: {
        fcp: lhr.audits['first-contentful-paint'].numericValue,
        lcp: lhr.audits['largest-contentful-paint'].numericValue,
        cls: lhr.audits['cumulative-layout-shift'].numericValue,
        tti: lhr.audits.interactive.numericValue,
        tbt: lhr.audits['total-blocking-time'].numericValue,
        speedIndex: lhr.audits['speed-index'].numericValue,
      },
      diagnostics: {
        domSize: lhr.audits['dom-size'].numericValue,
        bootupTime: lhr.audits.bootup-time?.numericValue || 0,
        mainThreadWork: lhr.audits['mainthread-work-breakdown'].numericValue,
        unusedJavaScript: lhr.audits['unused-javascript']?.details?.overallSavingsBytes || 0,
        unusedCss: lhr.audits['unused-css-rules']?.details?.overallSavingsBytes || 0,
      },
      opportunities: lhr.audits['server-response-time']?.numericValue
        ? [{
            audit: 'server-response-time',
            savings: lhr.audits['server-response-time'].numericValue,
          }]
        : [],
    };
  } catch (error) {
    console.error(`❌ Error auditing ${url}:`, error.message);
    return {
      url,
      locale,
      page: page.name,
      error: error.message,
    };
  }
}

async function runAllAudits() {
  console.log('🚀 Starting Lighthouse Audits...');
  console.log(`📍 Base URL: ${BASE_URL}`);
  console.log(`🌍 Locales: ${LOCALES.join(', ')}`);
  console.log(`📄 Pages: ${PAGES.map(p => p.name).join(', ')}`);

  const results = [];

  for (const locale of LOCALES) {
    for (const page of PAGES) {
      const result = await auditPage(locale, page);
      results.push(result);

      // Brief summary
      if (!result.error) {
        console.log(`  ✅ Performance: ${result.scores.performance}`);
        console.log(`  ✅ Accessibility: ${result.scores.accessibility}`);
        console.log(`  ✅ SEO: ${result.scores.seo}`);
        console.log(`  📊 LCP: ${(result.metrics.lcp / 1000).toFixed(2)}s`);
        console.log(`  📊 CLS: ${result.metrics.cls.toFixed(3)}`);
      }
    }
  }

  // Save results
  const outputDir = path.join(__dirname, '..', 'audit-reports');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = path.join(outputDir, `baseline-${timestamp}.json`);

  fs.writeFileSync(outputPath, JSON.stringify({
    auditDate: new Date().toISOString(),
    baseUrl: BASE_URL,
    locales: LOCALES,
    pages: PAGES.map(p => p.name),
    results,
    summary: generateSummary(results),
  }, null, 2));

  console.log(`\n📊 Results saved to: ${outputPath}`);

  // Print summary
  printSummary(results);
}

function generateSummary(results) {
  const validResults = results.filter(r => !r.error);

  if (validResults.length === 0) {
    return { error: 'No valid results' };
  }

  const avg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

  return {
    totalPages: results.length,
    successfulAudits: validResults.length,
    failedAudits: results.length - validResults.length,
    averageScores: {
      performance: Math.round(avg(validResults.map(r => r.scores.performance))),
      accessibility: Math.round(avg(validResults.map(r => r.scores.accessibility))),
      bestPractices: Math.round(avg(validResults.map(r => r.scores.bestPractices))),
      seo: Math.round(avg(validResults.map(r => r.scores.seo))),
    },
    averageMetrics: {
      lcp: (avg(validResults.map(r => r.metrics.lcp)) / 1000).toFixed(2) + 's',
      cls: avg(validResults.map(r => r.metrics.cls)).toFixed(3),
      fcp: (avg(validResults.map(r => r.metrics.fcp)) / 1000).toFixed(2) + 's',
      tti: (avg(validResults.map(r => r.metrics.tti)) / 1000).toFixed(2) + 's',
    },
    hardGateStatus: {
      performanceTarget: 95,
      performanceActual: Math.round(avg(validResults.map(r => r.scores.performance))),
      performancePassed: avg(validResults.map(r => r.scores.performance)) >= 95,

      seoTarget: 90,
      seoActual: Math.round(avg(validResults.map(r => r.scores.seo))),
      seoPassed: avg(validResults.map(r => r.scores.seo)) >= 90,

      accessibilityTarget: 95,
      accessibilityActual: Math.round(avg(validResults.map(r => r.scores.accessibility))),
      accessibilityPassed: avg(validResults.map(r => r.scores.accessibility)) >= 95,

      lcpTarget: 2.0,
      lcpActual: avg(validResults.map(r => r.metrics.lcp)) / 1000,
      lcpPassed: avg(validResults.map(r => r.metrics.lcp)) < 2000,

      clsTarget: 0.1,
      clsActual: avg(validResults.map(r => r.metrics.cls)),
      clsPassed: avg(validResults.map(r => r.metrics.cls)) < 0.1,
    },
  };
}

function printSummary(results) {
  const summary = generateSummary(results);

  console.log('\n' + '='.repeat(60));
  console.log('📊 BASELINE AUDIT SUMMARY');
  console.log('='.repeat(60));

  console.log('\n🎯 Average Scores:');
  console.log(`  Performance:    ${summary.averageScores.performance}/100`);
  console.log(`  Accessibility:  ${summary.averageScores.accessibility}/100`);
  console.log(`  Best Practices: ${summary.averageScores.bestPractices}/100`);
  console.log(`  SEO:            ${summary.averageScores.seo}/100`);

  console.log('\n📈 Average Metrics:');
  console.log(`  LCP: ${summary.averageMetrics.lcp}`);
  console.log(`  CLS: ${summary.averageMetrics.cls}`);
  console.log(`  FCP: ${summary.averageMetrics.fcp}`);
  console.log(`  TTI: ${summary.averageMetrics.tti}`);

  console.log('\n🚨 Hard Gate Status:');
  const hg = summary.hardGateStatus;
  console.log(`  Performance ≥95:    ${hg.performanceActual}/100 ${hg.performancePassed ? '✅' : '❌'}`);
  console.log(`  SEO ≥90:            ${hg.seoActual}/100 ${hg.seoPassed ? '✅' : '❌'}`);
  console.log(`  Accessibility ≥95:  ${hg.accessibilityActual}/100 ${hg.accessibilityPassed ? '✅' : '❌'}`);
  console.log(`  LCP <2.0s:          ${hg.lcpActual.toFixed(2)}s ${hg.lcpPassed ? '✅' : '❌'}`);
  console.log(`  CLS <0.1:           ${hg.clsActual.toFixed(3)} ${hg.clsPassed ? '✅' : '❌'}`);

  console.log('\n' + '='.repeat(60));
}

// Run if called directly
if (require.main === module) {
  runAllAudits().catch(console.error);
}

module.exports = { runAllAudits, auditPage };
