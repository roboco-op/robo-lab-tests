# Robo-Lab Web Scanner - Playwright Test Suite

Comprehensive automated test suite for Robo-Lab Web Scanner using Playwright and TypeScript.

## 📋 Test Cases Overview

### Test Case 1: Homepage Load Verification
- **Objective**: Verify homepage loads successfully with all essential elements
- **Coverage**: Page title, main content visibility, page load state
- **Expected Result**: Homepage displays correctly with proper title

### Test Case 2: Navigation Menu Functionality
- **Objective**: Test all navigation links are accessible and functional
- **Coverage**: Menu items, navigation links, routing
- **Expected Result**: All navigation items work correctly

### Test Case 3: URL Input Validation
- **Objective**: Validate URL input field with valid and invalid URLs
- **Coverage**: Input validation, form validation messages
- **Expected Result**: Input accepts valid URLs and rejects invalid ones

### Test Case 4: Scan Button Functionality
- **Objective**: Test scan button triggers appropriate scanning action
- **Coverage**: Button click event, loading states, scan initiation
- **Expected Result**: Scan starts when button is clicked

### Test Case 5: Results Display
- **Objective**: Validate scan results are properly displayed
- **Coverage**: Results container, data display, scan completion
- **Expected Result**: Results appear after scan completion

### Test Case 6: Responsive Design
- **Objective**: Test mobile viewport responsiveness
- **Coverage**: Mobile layout, responsive elements, touch interactions
- **Expected Result**: Application displays correctly on mobile devices

### Test Case 7: Form Reset Functionality
- **Objective**: Test form clear/reset functionality
- **Coverage**: Clear button, form reset, input clearing
- **Expected Result**: Form can be cleared/reset successfully

### Test Case 8: Error Handling
- **Objective**: Verify application handles network errors gracefully
- **Coverage**: Offline mode, error messages, network failures
- **Expected Result**: Appropriate error messages display on failure

### Test Case 9: Accessibility Standards
- **Objective**: Test basic accessibility features
- **Coverage**: ARIA labels, semantic HTML, keyboard navigation, alt text
- **Expected Result**: Application meets basic accessibility standards

### Test Case 10: Multiple Consecutive Scans
- **Objective**: Test multiple scan operations work consecutively
- **Coverage**: Multiple submissions, state management, performance
- **Expected Result**: Multiple scans execute without issues

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Install Playwright browsers:**
```bash
npx playwright install
```

## 🧪 Running Tests

### Run all tests:
```bash
npm test
```

### Run tests in headed mode (see browser):
```bash
npm run test:headed
```

### Run tests in UI mode (interactive):
```bash
npm run test:ui
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests for specific browser:
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run mobile tests:
```bash
npm run test:mobile
```

### View test report:
```bash
npm run report
```

### Generate tests with Codegen:
```bash
npm run codegen
```

## 📊 Test Reports

After running tests, reports are generated in:
- **HTML Report**: `playwright-report/index.html`
- **JSON Report**: `test-results/results.json`
- **Screenshots**: `test-results/`

To view the HTML report:
```bash
npx playwright show-report
```

## 🏗️ Project Structure

```
robo-lab-tests/
├── .github/
│   └── workflows/
│       ├── ci-smoke.yml          # Smoke test CI workflow (on push/PR)
│       ├── ci-regression.yml     # Regression test CI workflow
│       └── nightly-full.yml      # Nightly full suite + Slack notifications
├── src/
│   ├── assertions/
│   │   └── scanner-assertions.ts # Custom assertion helpers
│   ├── fixtures/
│   │   └── scanner.fixture.ts    # Playwright test fixtures
│   ├── pages/
│   │   ├── base.page.ts          # Base page object
│   │   ├── scanner.page.ts       # Scanner page object
│   │   └── consultation.page.ts  # Consultation page object
│   ├── types/
│   │   └── scanner.types.ts      # TypeScript type definitions
│   └── utils/
│       ├── test-data.ts          # Test data constants
│       └── wait-helpers.ts       # Custom wait utilities
├── tests/
│   ├── smoke/
│   │   ├── homepage.spec.ts      # TC01: Homepage load
│   │   ├── navigation.spec.ts    # TC02: Navigation menu
│   │   └── url-input.spec.ts     # TC03: URL input validation
│   ├── regression/
│   │   ├── scanner-flow.spec.ts  # TC04-05: Scan flow & results
│   │   ├── responsive.spec.ts    # TC06-07: Mobile & form reset
│   │   ├── error-handling.spec.ts# TC08: Network error handling
│   │   ├── accessibility.spec.ts # TC09: Accessibility standards
│   │   └── consultation.spec.ts  # TC11-14: Book consultation flow
│   └── performance/
│       └── multiple-scans.spec.ts# TC10: Multiple consecutive scans
├── playwright.config.ts          # Playwright configuration
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── test-results/                 # Test artifacts (screenshots, videos)
└── playwright-report/            # HTML test reports
```

## 🔧 Configuration

### Browser Configuration
Tests run on multiple browsers by default:
- Chromium (Desktop)
- Firefox (Desktop)
- WebKit/Safari (Desktop)
- Mobile Chrome (Pixel 5)
- Mobile Safari (iPhone 12)

### Timeouts
- Action timeout: 15 seconds
- Navigation timeout: 30 seconds

### Retry Strategy
- Local: No retries
- CI: 2 retries on failure

## 📝 Test Execution Tips

1. **Running specific test:**
```bash
npx playwright test -g "TC01"
```

2. **Running tests with trace:**
```bash
npx playwright test --trace on
```

3. **View trace:**
```bash
npx playwright show-trace trace.zip
```

4. **Update snapshots:**
```bash
npx playwright test --update-snapshots
```

## 🐛 Debugging

### Visual debugging:
```bash
npx playwright test --debug
```

### Show browser console:
```bash
PWDEBUG=console npx playwright test
```

### Slow motion execution:
```bash
npx playwright test --headed --slow-mo=1000
```

## 📈 CI/CD Integration

### GitHub Actions Example:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🔍 Best Practices

1. **Use data-testid attributes** for reliable selectors
2. **Avoid hardcoded waits** - use Playwright's auto-waiting
3. **Keep tests independent** - each test should run in isolation
4. **Use Page Object Model** for larger test suites
5. **Regular maintenance** - update selectors as UI changes

## 📚 Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-test`
3. Commit changes: `git commit -am 'Add new test case'`
4. Push to branch: `git push origin feature/new-test`
5. Submit pull request

## 📄 License

MIT License - feel free to use this test suite for your projects.

## 📧 Support

For issues or questions, please open an issue in the repository.

---

**Note**: Make sure to update the base URL in `playwright.config.ts` if the application URL changes.
