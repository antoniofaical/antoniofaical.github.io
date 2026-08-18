import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotsDir = path.resolve(__dirname, '../visual');

test.describe('bases clinicas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./analises/bases-clinicas/');
  });

  test('renders clinical narrative anchors and explorer', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1, name: /bases clínicas/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /papel do glicogênio/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /classificação essencial/i })).toBeVisible();
    await expect(page.getByLabel(/filtrar por padrão clínico/i)).toBeVisible();
    await expect(page.getByText(/não é algoritmo clínico/i).first()).toBeVisible();
    await expect(page.getByText(/conteúdo informativo/i).first()).toBeVisible();
  });

  test('GSD explorer filters by keyboard-accessible controls', async ({ page }) => {
    const select = page.getByLabel(/filtrar por padrão clínico/i);
    await select.selectOption('muscular');
    await expect(page.getByRole('status')).toContainText(/de \d+ condições/i);
    await page.getByLabel(/buscar por nome/i).fill('Pompe');
    await expect(page.getByRole('heading', { name: /Pompe/i }).first()).toBeVisible();
  });

  test('has no serious accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('screenshots clinical viewports and filtered explorer', async ({ page }) => {
    for (const width of [375, 768, 1440] as const) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(shotsDir, `bases-clinicas-${width}.png`),
        fullPage: true,
      });
    }

    await page.setViewportSize({ width: 768, height: 900 });
    await page.getByLabel(/filtrar por padrão clínico/i).selectOption('hepatic');
    await page.screenshot({
      path: path.join(shotsDir, 'bases-clinicas-explorer-hepatic-768.png'),
      fullPage: false,
    });
  });
});

test.describe('impacto socioeconômico', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./analises/impacto-socioeconomico/');
  });

  test('renders socioeconomic narrative and guardrails', async ({ page }) => {
    await expect(
      page.getByRole('heading', { level: 1, name: /impacto socioeconômico/i }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { name: /camadas de custo/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /segmentos de mercado/i })).toBeVisible();
    await expect(page.getByText(/AIHs não equivalem a pacientes/i).first()).toBeVisible();
    await expect(page.getByText(/Receita observada não é TAM/i).first()).toBeVisible();
  });

  test('forbids AIH=paciente and receita=TAM equivalences in page text', async ({ page }) => {
    const body = (await page.locator('main').innerText()).toLowerCase();
    expect(body).not.toMatch(/997\s+pacientes/);
    expect(body).not.toMatch(/aih(?:s)?\s+(?:são|=)\s+pacientes?/);
    expect(body).not.toMatch(/\breceita(?:\s+observada)?\s*(?:é|=)\s*tam\b/);
    expect(body).toMatch(/aihs não equivalem a pacientes/);
    expect(body).toMatch(/receita observada não é tam/);
    expect(body).toMatch(/não é total addressable market \(tam\)/);
  });

  test('has no serious accessibility violations', async ({ page }) => {
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(overflow).toBe(false);
  });

  test('screenshots socioeconomic viewports', async ({ page }) => {
    for (const width of [375, 768, 1440] as const) {
      await page.setViewportSize({ width, height: width === 375 ? 812 : 900 });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: path.join(shotsDir, `impacto-socioeconomico-${width}.png`),
        fullPage: true,
      });
    }
  });
});
