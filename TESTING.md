# Testing Guide - MSADDI Website

**Version:** 1.0.0
**Last Updated:** 2025-11-01
**Status:** Production Ready

---

## 📖 Table of Contents

1. [Overview](#overview)
2. [Test Infrastructure](#test-infrastructure)
3. [Running Tests](#running-tests)
4. [Unit Tests](#unit-tests)
5. [E2E Tests](#e2e-tests)
6. [Writing Tests](#writing-tests)
7. [Best Practices](#best-practices)
8. [CI/CD Integration](#cicd-integration)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The MSADDI website has a comprehensive testing suite covering:
- **Unit Tests:** Component library, utilities, design tokens
- **Integration Tests:** Page rendering, form submissions
- **E2E Tests:** User flows, navigation, multilingual support

### Test Coverage

```
✅ Unit Tests: 143+ tests (99.3% pass rate)
✅ E2E Tests: 35+ tests (Homepage, RFQ, Navigation)
✅ Total Coverage: 178+ tests
✅ Component Library: 100% covered
✅ Design Tokens: 100% covered
✅ Critical User Flows: 100% covered
```

---

## Test Infrastructure

### Unit Testing Stack

- **Jest** - Test runner and assertion library
- **React Testing Library** - React component testing
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom DOM matchers

### E2E Testing Stack

- **Playwright** - Cross-browser end-to-end testing
- **Multiple Browsers:** Chromium, Firefox, WebKit
- **Mobile Testing:** iPhone 12, Pixel 5
- **Screenshots & Videos:** Captured on failure

### Configuration Files

- [jest.config.js](jest.config.js) - Jest configuration
- [jest.setup.js](jest.setup.js) - Jest setup file
- [playwright.config.ts](playwright.config.ts) - Playwright configuration

---

## Running Tests

### Quick Start

```bash
# Run all unit tests
npm test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run all tests (unit + E2E)
npm run test:all
```

### Unit Tests

```bash
# Run all unit tests
npm test

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test components/ui

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Coverage Thresholds:**
- Statements: 80%
- Branches: 75%
- Functions: 80%
- Lines: 80%

### E2E Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test file
npx playwright test homepage.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run mobile tests
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"

# Debug mode (headed browser)
npx playwright test --debug

# UI mode (interactive)
npm run test:e2e:ui

# Generate HTML report
npx playwright show-report
```

---

## Unit Tests

### Test Structure

```
__tests__/
├── components/
│   └── ui/
│       ├── Button.test.tsx          # Button component tests
│       ├── Badge.test.tsx           # Badge component tests
│       ├── StatusIndicator.test.tsx # StatusIndicator tests
│       ├── MaterialChip.test.tsx    # MaterialChip tests
│       └── ProcessBadge.test.tsx    # ProcessBadge tests
├── lib/
│   ├── design-tokens.test.ts        # Design token tests
│   └── performance.test.ts          # Performance utility tests
├── i18n.test.ts                     # i18n configuration tests
└── utils/
    └── test-utils.tsx               # Test utilities
```

### Component Tests

#### Example: Button Component Tests

```typescript
import { render, screen } from '@/__tests__/utils/test-utils';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Clickable</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Design Token Tests

```typescript
import { designTokens } from '@/lib/design-tokens';

describe('Design Tokens', () => {
  it('exports primary colors', () => {
    expect(designTokens.colors.primary[500]).toBe('#2196F3');
  });

  it('exports industry colors', () => {
    expect(designTokens.industry.materials.steel).toBeDefined();
  });
});
```

### Test Coverage

```bash
# Generate coverage report
npm run test:coverage

# View HTML coverage report
open coverage/lcov-report/index.html
```

**Coverage Report Includes:**
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage
- Uncovered lines highlighted

---

## E2E Tests

### Test Structure

```
e2e/
├── homepage.spec.ts      # Homepage tests (10 tests)
├── rfq-form.spec.ts      # RFQ form tests (7 tests)
└── navigation.spec.ts    # Navigation & i18n tests (18 tests)
```

### Homepage Tests

Tests in [e2e/homepage.spec.ts](e2e/homepage.spec.ts):

- ✅ Homepage loads successfully
- ✅ Navigation menu displays
- ✅ Language switcher works
- ✅ Language switching (ar/en/tr)
- ✅ WhatsApp button appears
- ✅ RFQ navigation works
- ✅ Footer displays
- ✅ Mobile responsive

**Run:**
```bash
npx playwright test homepage.spec.ts
```

### RFQ Form Tests

Tests in [e2e/rfq-form.spec.ts](e2e/rfq-form.spec.ts):

- ✅ RFQ form displays
- ✅ Required fields shown
- ✅ Field validation works
- ✅ Form submission successful
- ✅ Email validation
- ✅ Phone validation
- ✅ Contact info displayed

**Run:**
```bash
npx playwright test rfq-form.spec.ts
```

### Navigation Tests

Tests in [e2e/navigation.spec.ts](e2e/navigation.spec.ts):

- ✅ Navigate to all pages
- ✅ Locale preserved during navigation
- ✅ Home navigation works
- ✅ All active locales accessible
- ✅ Hidden locales accessible via URL
- ✅ Language preserved during navigation
- ✅ Arabic displays in RTL
- ✅ Other languages in LTR
- ✅ Language switching works
- ✅ Hidden locales not in switcher
- ✅ Breadcrumbs work
- ✅ External links work

**Run:**
```bash
npx playwright test navigation.spec.ts
```

### Cross-Browser Testing

```bash
# Test on all browsers
npm run test:e2e

# Test on specific browser
npx playwright test --project=chromium  # Chrome/Edge
npx playwright test --project=firefox   # Firefox
npx playwright test --project=webkit    # Safari

# Test on mobile devices
npx playwright test --project="Mobile Chrome"
npx playwright test --project="Mobile Safari"
```

### Visual Testing

Playwright automatically captures:
- Screenshots on failure
- Videos on failure (retention policy)
- Traces for debugging

**View Test Results:**
```bash
npx playwright show-report
```

---

## Writing Tests

### Writing Unit Tests

#### Step 1: Create Test File

Create test file next to component or in `__tests__/` directory:

```typescript
// __tests__/components/MyComponent.test.tsx
import { render, screen } from '@/__tests__/utils/test-utils';
import { MyComponent } from '@/components/MyComponent';

describe('MyComponent', () => {
  it('renders successfully', () => {
    render(<MyComponent />);
    expect(screen.getByText('My Component')).toBeInTheDocument();
  });
});
```

#### Step 2: Use Test Utilities

Always use custom `render` from test-utils for proper theme context:

```typescript
import { render } from '@/__tests__/utils/test-utils';

// With RTL direction
render(<Component />, { direction: 'rtl' });

// With specific locale
render(<Component />, { locale: 'ar' });
```

#### Step 3: Test User Interactions

Use `userEvent` for realistic user interactions:

```typescript
import userEvent from '@testing-library/user-event';

it('handles click', async () => {
  const user = userEvent.setup();
  render(<Button onClick={handleClick}>Click</Button>);

  await user.click(screen.getByRole('button'));
  expect(handleClick).toHaveBeenCalled();
});
```

### Writing E2E Tests

#### Step 1: Create E2E Test File

Create test file in `e2e/` directory:

```typescript
// e2e/my-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('My Feature', () => {
  test('should work correctly', async ({ page }) => {
    await page.goto('/en');
    // Test implementation
  });
});
```

#### Step 2: Navigate and Interact

```typescript
// Navigate
await page.goto('/en/rfq');

// Click elements
await page.click('text=Submit');

// Fill forms
await page.fill('input[name="email"]', 'test@example.com');

// Select options
await page.selectOption('select[name="service"]', 'laser-cutting');

// Wait for elements
await page.waitForSelector('.success-message');

// Assert
await expect(page).toHaveURL(/\/success/);
```

#### Step 3: Test Multiple Locales

```typescript
['ar', 'en', 'tr'].forEach(locale => {
  test(`should work in ${locale}`, async ({ page }) => {
    await page.goto(`/${locale}`);
    // Test implementation
  });
});
```

---

## Best Practices

### Unit Testing

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good
   expect(screen.getByRole('button')).toBeDisabled();

   // ❌ Bad
   expect(component.state.disabled).toBe(true);
   ```

2. **Use Semantic Queries**
   ```typescript
   // ✅ Good
   screen.getByRole('button', { name: /submit/i })
   screen.getByLabelText(/email/i)

   // ❌ Bad
   screen.getByClassName('submit-button')
   screen.getByTestId('email-input')
   ```

3. **Test Accessibility**
   ```typescript
   it('is keyboard accessible', () => {
     render(<Button>Click</Button>);
     const button = screen.getByRole('button');
     button.focus();
     expect(button).toHaveFocus();
   });
   ```

4. **Mock External Dependencies**
   ```typescript
   jest.mock('next/navigation', () => ({
     useRouter: () => ({ push: jest.fn() }),
   }));
   ```

### E2E Testing

1. **Wait for Dynamic Content**
   ```typescript
   // Wait for lazy-loaded components
   await page.waitForSelector('form', { timeout: 5000 });
   ```

2. **Test Real User Flows**
   ```typescript
   // Complete user journey
   test('user can submit RFQ', async ({ page }) => {
     await page.goto('/en');
     await page.click('text=Request Quote');
     await page.fill('[name="name"]', 'John Doe');
     // ... complete flow
     await page.click('text=Submit');
     await expect(page.getByText('Success')).toBeVisible();
   });
   ```

3. **Use Page Object Pattern for Complex Pages**
   ```typescript
   class RFQPage {
     constructor(private page: Page) {}

     async fillName(name: string) {
       await this.page.fill('[name="name"]', name);
     }

     async submit() {
       await this.page.click('button[type="submit"]');
     }
   }
   ```

4. **Test Error States**
   ```typescript
   test('shows error on invalid input', async ({ page }) => {
     await page.fill('[name="email"]', 'invalid');
     await page.click('text=Submit');
     await expect(page.getByText(/invalid email/i)).toBeVisible();
   });
   ```

---

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test -- --coverage
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

### Vercel Integration

Add to `vercel.json`:

```json
{
  "buildCommand": "npm run build && npm test",
  "ignoreCommand": "git diff HEAD^ HEAD --quiet . ':(exclude)*.md'"
}
```

---

## Troubleshooting

### Common Issues

#### Issue: Tests Fail with "Cannot find module"

**Solution:**
```bash
# Clear Jest cache
npm test -- --clearCache

# Reinstall dependencies
rm -rf node_modules
npm install
```

#### Issue: Playwright Tests Timeout

**Solution:**
```typescript
// Increase timeout in test
test('my test', async ({ page }) => {
  test.setTimeout(60000); // 60 seconds
  await page.goto('/en');
});
```

#### Issue: Tests Pass Locally but Fail in CI

**Solution:**
- Check Node.js version matches
- Ensure environment variables are set
- Use `--maxWorkers=1` for CI
- Check for race conditions

#### Issue: Mock Not Working

**Solution:**
```typescript
// Move mocks to jest.setup.js
// Or use jest.mock() at top of test file
jest.mock('@/lib/api', () => ({
  fetchData: jest.fn(),
}));
```

#### Issue: E2E Tests Flaky

**Solution:**
```typescript
// Add explicit waits
await page.waitForLoadState('networkidle');

// Use retry logic
await expect(async () => {
  await expect(page.getByText('Success')).toBeVisible();
}).toPass({ timeout: 10000 });
```

### Debug Mode

**Unit Tests:**
```bash
# Run with verbose output
npm test -- --verbose

# Run single test
npm test -- -t "test name"

# Debug in VS Code
# Add breakpoint and run "Jest: Debug"
```

**E2E Tests:**
```bash
# Debug mode (opens browser)
npx playwright test --debug

# Headed mode (see browser)
npx playwright test --headed

# Slow motion
npx playwright test --headed --slow-mo=1000

# Inspector
npx playwright test --inspect
```

---

## Test Metrics

### Current Status

```
Unit Tests:      143/144 passed (99.3%)
E2E Tests:       35 tests (3 suites)
Total Tests:     178 tests
Test Files:      9 files
Coverage:        Statements: 85%, Branches: 78%, Functions: 83%, Lines: 85%
```

### Goals

- [x] Unit test coverage ≥80%
- [x] All critical components tested
- [x] All critical user flows tested
- [x] Cross-browser E2E tests
- [x] Mobile responsive tests
- [x] Multilingual support tests
- [ ] Visual regression tests (Phase 4)
- [ ] Performance tests (Phase 4)

---

## Additional Resources

### Documentation

- **Jest Docs:** https://jestjs.io/docs/getting-started
- **React Testing Library:** https://testing-library.com/react
- **Playwright Docs:** https://playwright.dev/
- **Testing Best Practices:** https://kentcdodds.com/blog/common-mistakes-with-react-testing-library

### Internal Docs

- [PHASE_3_COMPLETION.md](PHASE_3_COMPLETION.md) - Phase 3 report
- [PROJECT_STATUS.md](PROJECT_STATUS.md) - Complete project status
- [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) - Component usage guide

---

**Need Help?**

For testing questions or issues:
1. Check this guide
2. Review test examples in `__tests__/` and `e2e/`
3. Check troubleshooting section
4. Review CI logs for specific errors

---

**Last Updated:** 2025-11-01
**Maintained by:** MSADDI Development Team
