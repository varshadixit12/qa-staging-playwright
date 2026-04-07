# Contributing to QA Staging Playwright

Thank you for contributing to this project! Here are some guidelines to help you get started.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`

## Development Workflow

1. Make your changes
2. Run tests locally: `npm test`
3. Ensure all tests pass
4. Commit your changes with clear commit messages
5. Push to your fork
6. Create a Pull Request

## Coding Standards

### Test Structure
- Use Page Object Model (POM) pattern
- Keep locators in separate files under `locators/`
- Store page methods in `page/` directory
- Place utility functions in `Utility/`

### Naming Conventions
- Test files: `*.spec.ts`
- Page objects: PascalCase (e.g., `SohoWorksPage.ts`)
- Test names: Descriptive and clear (e.g., `'should validate member application form'`)

### Best Practices
- Write clear, readable test descriptions
- Use meaningful variable names
- Add comments for complex logic
- Keep tests independent and isolated
- Avoid hard-coded waits; use Playwright's auto-waiting
- Store test data in `tests/testData/`

## Commit Messages

Follow conventional commit format:
- `feat:` New feature
- `fix:` Bug fix
- `test:` Adding or updating tests
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `chore:` Maintenance tasks

Example: `feat: add login validation test`

## Pull Request Process

1. Ensure all tests pass locally
2. Update documentation if needed
3. Provide a clear PR description
4. Link related issues
5. Request review from maintainers

## Questions?

If you have questions, please open an issue for discussion.
