import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/website',
  use: { baseURL: 'http://127.0.0.1:3018', headless: true },
  webServer: {
    command: 'cd website && bunx --no-install next start -p 3018',
    url: 'http://127.0.0.1:3018',
    reuseExistingServer: false,
    timeout: 60000,
  },
  reporter: 'list',
});
