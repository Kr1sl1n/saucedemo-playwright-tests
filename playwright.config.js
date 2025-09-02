// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 1,
  workers: 1,

  projects: [
    {
      name: 'ui-tests',
      testDir: './tests',
      use: {
        baseURL: 'https://www.saucedemo.com/',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on',
      },
    },
    {
      name: 'api-tests',
      testDir: './api-tests',
      use: {
        baseURL: 'https://petstore.swagger.io/v2',
        headless: true,
      },
    },
  ],
});

