# Playwright Test Automation - QA Staging

Automated end-to-end testing suite for Soho Works membership application using Playwright.

## Overview

This repository contains automated tests for validating the Soho Works membership application flow, including API validation and UI testing.

## Prerequisites

- Node.js 18+ or 20+
- npm or yarn

## Installation

```bash
npm install
```

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests with Allure report
```bash
npm run test:with-report
```

### Generate Allure report only
```bash
npm run allure:report
```

## Project Structure

```
├── .github/
│   └── workflows/       # GitHub Actions CI/CD workflows
├── tests/              # Test specifications
│   └── testData/       # Test data files (images, etc.)
├── page/               # Page Object Models
├── locators/           # Element locators
├── Utility/            # Helper utilities
├── playwright.config.ts # Playwright configuration
└── package.json        # Project dependencies
```

## CI/CD Pipeline

### Scheduled Daily Runs
- Tests run automatically every day at 8:00 AM UK time
- Results are stored as artifacts for 30 days
- Can be manually triggered from GitHub Actions

### Pull Request Tests
- Tests run automatically on PRs to main/master/develop branches
- Results are stored for 7 days

## Configuration

The test configuration is defined in `playwright.config.ts`:
- Browser: Chromium
- Retries: 2 on CI, 0 locally
- Workers: 1 on CI for stability
- Reports: Allure and List format

## Test Reports

After running tests, reports are available in:
- `playwright-report/` - HTML report
- `allure-results/` - Raw Allure data
- `allure-report/` - Generated Allure HTML report

## Environment Variables

For production use, configure environment variables in GitHub Secrets or local `.env` file:
- Add any API keys, credentials, or environment-specific URLs as needed

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass locally
4. Submit a pull request

## License

ISC
