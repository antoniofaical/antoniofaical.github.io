import { defineConfig, devices } from '@playwright/test';
import { normalizeBasePath } from './tests/e2e/basePath';

const origin = process.env.PLAYWRIGHT_ORIGIN ?? 'http://127.0.0.1:4321';
const appBasePath = normalizeBasePath(process.env.BASE_PATH);
/** baseURL includes the app BASE_PATH so relative goto() stays under the served prefix. */
const baseURL = new URL(appBasePath, origin.endsWith('/') ? origin : `${origin}/`).toString();

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4321',
    url: baseURL,
    // Never reuse: dual BASE_PATH runs must not inherit a server built for the other prefix.
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      ...process.env,
      BASE_PATH: appBasePath,
      SITE_URL: 'https://example.github.io',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
