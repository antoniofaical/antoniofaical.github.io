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

  test('mobile menu opens, Escape closes, focus returns', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const toggle = page.getByRole('button', { name: /menu/i }).first();
    await toggle.click();
    await expect(page.getByRole('dialog', { name: /menu|navegação/i })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });

  test('screenshots at key viewports', async ({ page }) => {
    for (const width of [375, 768, 1440] as const) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
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

test('base path build smoke via root placeholder', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /fundação técnica/i })).toBeVisible();
});
