# Project Structure

```
qa-staging-playwright/
├── .github/
│   ├── workflows/
│   │   ├── playwright.yml         # Daily scheduled tests (8 AM UK)
│   │   ├── pr-tests.yml          # PR validation tests
│   │   └── dependency-check.yml   # Weekly dependency audit
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   └── pull_request_template.md
│
├── tests/
│   ├── testData/                  # Test assets (images, etc.)
│   ├── Membershipcard.spec.ts
│   ├── SohoWorksMembership.spec.ts
│   ├── memberProfile.spec.ts
│   └── webtesting.spec.ts
│
├── page/                          # Page Object Models
│   ├── Membershipcard.ts
│   └── SohoWorksMembership.ts
│
├── locators/                      # Element locators
│   ├── Membershipcardlocators.ts
│   └── SohoWorksMembership.ts
│
├── Utility/                       # Helper utilities
│   ├── Report.ts
│   ├── apiHelper.ts
│   └── waitHelper.ts
│
├── .env.example                   # Environment template
├── .gitignore                     # Git ignore rules
├── CHANGELOG.md                   # Version history
├── CONTRIBUTING.md                # Contribution guide
├── README.md                      # Project documentation
├── SECURITY.md                    # Security policies
├── package.json                   # Dependencies & scripts
└── playwright.config.ts           # Playwright configuration
```

## Key Features

### CI/CD Pipeline
- **Daily Scheduled Runs**: Automatically runs at 8:00 AM UK time
- **PR Validation**: Tests run on every pull request
- **Artifact Storage**: Reports saved for 30 days (scheduled) / 7 days (PRs)
- **Manual Trigger**: Can be triggered manually via GitHub Actions UI

### Test Configuration
- **Browser**: Chromium (Desktop Chrome)
- **Viewport**: 1920x1080
- **Retries**: 2 on CI, 0 locally
- **Workers**: 1 on CI (for stability)
- **Timeouts**: 60s per test, 30s navigation, 15s actions

### Reports
- **HTML Report**: Interactive Playwright report
- **Allure Report**: Detailed test execution report
- **JUnit XML**: For CI/CD integration
- **List Reporter**: Console output

### Best Practices
- Environment variables for configuration
- Screenshot & video on failure
- Trace collection on first retry
- Comprehensive .gitignore
- Security-focused setup
- Proper error handling

## Usage

### Local Development
\`\`\`bash
npm install              # Install dependencies
npm test                 # Run tests
npm run test:headed      # Run with browser visible
npm run test:ui          # Run in UI mode
npm run test:debug       # Debug mode
npm run allure:report    # Generate and open Allure report
\`\`\`

### Environment Setup
\`\`\`bash
cp .env.example .env
# Edit .env with your configuration
\`\`\`

### Git Workflow
\`\`\`bash
git add .
git commit -m "feat: your changes"
git push origin main
\`\`\`
