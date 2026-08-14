import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotsDir = path.resolve(__dirname, '../visual');

test.describe('home executive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('replaces placeholder and renders core narrative sections', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /família de doenças/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /problema em um minuto/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /números que enquadram/i })).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Mercado observado não é necessidade total/i }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: /Brasil: o que os dados mostram e omitem/i }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /como ler este painel/i })).toBeVisible();
    await expect(page.getByText(/fundação técnica pronta/i)).toHaveCount(0);
  });

  test('renders metrics from typed evidence layer', async ({ page }) => {
    await expect(page.getByText('mais de 20').first()).toBeVisible();
    await expect(page.getByText(/≈ €1,4 bi/i).first()).toBeVisible();
    await expect(page.getByText('997').first()).toBeVisible();
    await expect(page.getByText('AIHs').first()).toBeVisible();
    await expect(page.getByText('29').first()).toBeVisible();
    await expect(
      page.locator('.key-metric__limitation', { hasText: /não de TAM, SAM ou SOM/i }),
    ).toBeVisible();
    await expect(
      page.locator('.key-metric__limitation', { hasText: /AIHs não equivalem a pacientes/i }),
    ).toBeVisible();
  });

  test('analysis portals navigate to clinical and socioeconomic pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: /abrir bases clínicas/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /abrir impacto socioeconômico/i })).toBeVisible();
    await page.getByRole('link', { name: /abrir bases clínicas/i }).click();
    await expect(page).toHaveURL(/\/analises\/bases-clinicas\/?$/);
    await page.goto('/');
    await page.getByRole('link', { name: /abrir impacto socioeconômico/i }).click();
    await expect(page).toHaveURL(/\/analises\/impacto-socioeconomico\/?$/);
    await page.goto('/');
    const developing = page.getByRole('status').filter({ hasText: /em desenvolvimento/i });
    await expect(developing).toHaveCount(0);
    await expect(page.getByRole('link', { name: /abrir observatório de startups/i })).toBeVisible();
  });

  test('has no serious accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('mobile menu still supports keyboard modal behavior', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const toggle = page.locator('.mobile-nav__toggle');
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(toggle).toBeFocused();
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(overflow).toBe(false);
  });

  test('screenshots home viewports and open mobile menu', async ({ page }) => {
    for (const width of [375, 768, 1440] as const) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(shotsDir, `home-${width}.png`),
        fullPage: true,
      });
      await page.screenshot({
        path: path.join(shotsDir, `home-above-fold-${width}.png`),
        fullPage: false,
      });
    }

    await page.setViewportSize({ width: 375, height: 812 });
    await page.locator('.mobile-nav__toggle').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.screenshot({
      path: path.join(shotsDir, 'home-mobile-menu-375.png'),
      fullPage: false,
    });
  });
});
