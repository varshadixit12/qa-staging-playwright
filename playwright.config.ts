import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * Playwright Test Configuration
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run */
  timeout: 60 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter configuration */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', {
      detail: false,
      outputFolder: 'allure-results',
      suiteTitle: true
    }],
    ['junit', { outputFile: 'test-results/junit.xml' }]
  ],

  /* Shared settings for all projects */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',

    /* Collect trace on failure */
    trace: process.env.CI ? 'on-first-retry' : 'retain-on-failure',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on retry */
    video: 'retain-on-failure',
    
    /* Action timeout */
    actionTimeout: 15 * 1000,
    
    /* Navigation timeout */
    navigationTimeout: 30 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
  ],
});
