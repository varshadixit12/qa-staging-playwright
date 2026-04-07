# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-07

### Added
- Initial production-ready setup
- GitHub Actions CI/CD pipeline with daily scheduled runs at 8 AM UK time
- Comprehensive .gitignore file
- Environment variable support with .env.example
- Enhanced Playwright configuration with production settings
- Multiple test reporters (List, HTML, Allure, JUnit)
- README with project documentation
- CONTRIBUTING.md for contribution guidelines
- SECURITY.md for security policies
- Automated test reports upload to GitHub artifacts

### Changed
- Updated playwright.config.ts with production-ready settings
- Enhanced package.json with better metadata and scripts
- Improved error handling and retry logic for CI environments

### Removed
- .DS_Store files
- Generated report directories (playwright-report, allure-results, allure-report)
- Unnecessary commented code from configuration

### Fixed
- Added dotenv dependency for environment variable support
- Configured proper timeouts and viewport settings
