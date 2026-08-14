import { test, expect } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotsDir = path.resolve(__dirname, '../visual');

test.describe('design-system', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/design-system/');
  });

  test('renders fixture notice and evidence states', async ({ page }) => {
    await expect(
      page.getByText('Fixture de interface — não é dado científico').first(),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /Design System/i }).first()).toBeVisible();
    await expect(page.getByText('Não calculável').first()).toBeVisible();
  });

  test('loads local Inter and Manrope WOFF2 assets', async ({ page, baseURL }) => {
    const origin = baseURL ?? 'http://127.0.0.1:4321';
    for (const file of [
      'fonts/inter-variable.woff2',
      'fonts/inter-italic-variable.woff2',
      'fonts/manrope-variable.woff2',
    ]) {
      const response = await page.request.get(new URL(file, origin).toString());
      expect(response.ok(), `${file} must be served`).toBeTruthy();
      expect(response.headers()['content-type'] ?? '').toMatch(/font|woff2|octet-stream/i);
    }

    await expect(page.getByTestId('font-roster')).toBeVisible();
    await expect(page.getByTestId('font-loaded-status')).toContainText(/Inter/i);
    await expect(page.getByTestId('font-loaded-status')).toContainText(/Manrope/i);

    const families = await page.evaluate(async () => {
      await document.fonts.ready;
      return {
        body: getComputedStyle(document.body).fontFamily,
        heading: getComputedStyle(document.querySelector('h1')!).fontFamily,
      };
    });
    expect(families.body.toLowerCase()).toContain('inter');
    expect(families.heading.toLowerCase()).toContain('manrope');
  });

  test('mobile menu modal: focus, tab cycle, escape, aria-expanded', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const toggle = page.locator('.mobile-nav__toggle');

    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');

    const dialog = page.getByRole('dialog', { name: /menu de navegação/i });
    await expect(dialog).toBeVisible();

    const links = dialog.getByRole('link');
    const firstLink = links.first();
    const lastLink = links.last();
    const closeButton = dialog.getByRole('button', { name: /fechar menu/i });
    await expect(firstLink).toBeFocused();

    // Available routes are linked (home, clinical, socioeconomic, observatory); tab to close.
    await page.keyboard.press('Tab');
    await expect(links.nth(1)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(links.nth(2)).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(lastLink).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(closeButton).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(firstLink).toBeFocused();

    await page.keyboard.press('Shift+Tab');
    await expect(closeButton).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await expect(toggle).toBeFocused();
  });

  test('screenshots at key viewports', async ({ page }) => {
    for (const width of [375, 768, 1440] as const) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(shotsDir, `design-system-${width}.png`),
        fullPage: true,
      });
    }
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });
    expect(overflow).toBe(false);

    const toggle = page.locator('.mobile-nav__toggle');
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const overflowOpen = await page.evaluate(() => {
      const doc = document.documentElement;
      return doc.scrollWidth > doc.clientWidth + 1;
    });
    expect(overflowOpen).toBe(false);
  });

  test('respects reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/design-system/');
    const motion = await page
      .locator('.motion-demo, .motion-enter')
      .first()
      .evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          duration: style.animationDuration,
          name: style.animationName,
        };
      });
    const nearlyZero =
      motion.name === 'none' ||
      motion.duration === '0s' ||
      Number.parseFloat(motion.duration) < 0.05;
    expect(nearlyZero).toBeTruthy();
  });
});

test('home route smoke', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /família de doenças/i })).toBeVisible();
});
