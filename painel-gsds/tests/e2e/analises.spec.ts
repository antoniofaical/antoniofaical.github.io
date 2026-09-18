import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { expectLegacyShell } from './legacyShell';

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
    const clinicalText = await page.locator('main').innerText();
    const genericPrefix =
      'Conteúdo informativo e não substitutivo de avaliação médica especializada.';
    expect(clinicalText.split(genericPrefix).length - 1).toBe(1);
    await expect(page.getByText('Não constitui algoritmo diagnóstico.')).toBeVisible();
    await expect(page.getByText('Não constitui orientação terapêutica individual.')).toBeVisible();
    await expect(page.getByText(/Isto não é um algoritmo clínico/i)).toBeVisible();
    await expect(page.getByText(/Sem datas inventadas/i)).toBeVisible();
    await expect(page.getByText(/Sem empresas, rankings/i)).toBeVisible();
    expect(clinicalText).not.toMatch(/SoT/);
    expect(clinicalText).not.toMatch(/clm-/);
    expect(clinicalText).not.toMatch(/met-/);
    expect(clinicalText).not.toMatch(/CAR-/);
    expect(clinicalText).not.toMatch(/ECO-/);
    expect(clinicalText).not.toMatch(/docs\/source-of-truth/);
    expect(clinicalText).toMatch(/síntese médica/);
    expect(clinicalText).toMatch(/sem detalhamento adicional na síntese/);
    expect(clinicalText).toMatch(/proporção Ia\/Ib conforme síntese médica/);
    expect(clinicalText).toMatch(/Estimativa aproximada reportada na síntese médica/);
    expect(clinicalText).toMatch(/A síntese assinala elevada incerteza/);
    await expect(page.locator('.research-header__notice')).toHaveCount(1);
    await expect(page.locator('.footer-note')).toHaveCount(0);
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

  test('keeps the legacy shell outside the Home brand-pilot', async ({ page }) => {
    await expectLegacyShell(page);
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
    await expect(page.getByText(/não de TAM, SAM ou SOM/i).first()).toBeVisible();
    await expect(page.getByText('Perspectiva: Pagador')).toBeVisible();
    await expect(page.getByText('Perspectiva: Sistema de saúde').first()).toBeVisible();
    await expect(page.getByText('Perspectiva: Paciente')).toBeVisible();
    await expect(page.getByText('Perspectiva: Sociedade')).toBeVisible();
    await expect(page.getByText('Receita observada').first()).toBeVisible();
    await expect(page.getByText(/≈ €1,4 bilhão/i).first()).toBeVisible();
    await expect(page.locator('#visao-geral')).toHaveCount(0);
    await expect(page.locator('#jornada')).toHaveCount(0);
    await expect(page.locator('.research-header__notice')).toHaveCount(0);
    await expect(page.locator('.footer-note')).toHaveCount(0);

    const socioText = await page.locator('main').innerText();
    expect(socioText).not.toMatch(/VAL_TOT/);
    expect(socioText).not.toMatch(/observed-revenue/);
    expect(socioText).not.toMatch(/clm-/);
    expect(socioText).not.toMatch(/met-/);
    expect(socioText).not.toMatch(/CAR-/);
    expect(socioText).not.toMatch(/ECO-/);
    expect(socioText).not.toMatch(/docs\/source-of-truth/);
    expect(socioText).not.toMatch(/SoT/);
    expect(socioText).not.toMatch(/fonte de verdade/i);

    const order = await page.evaluate(() => {
      const ids = [
        'carga',
        'cuidador',
        'custos',
        'brasil',
        'segmentos',
        'sizing',
        'lacunas-evidencia',
        'limitacoes-e-fontes',
      ];
      return ids.map((id) => {
        const el = document.getElementById(id);
        return el ? [...document.querySelectorAll('main *')].indexOf(el) : -1;
      });
    });
    for (let index = 1; index < order.length; index += 1) {
      expect(order[index], `order[${index}]`).toBeGreaterThan(order[index - 1]);
    }

    const carga = await page.locator('#carga').innerText();
    const cuidador = await page.locator('#cuidador').innerText();
    expect(carga).not.toMatch(/17,7 horas/);
    expect(cuidador).toMatch(/17,7 horas/);

    const callout = page.locator('.datasus-callout');
    const groups = callout.locator('dl > div');
    const groupCount = await groups.count();
    expect(groupCount).toBeGreaterThan(0);
    for (let index = 0; index < groupCount; index += 1) {
      const group = groups.nth(index);
      expect(await group.locator('dt').count(), `dl group[${index}] dt`).toBeGreaterThanOrEqual(1);
      expect(await group.locator('dd').count(), `dl group[${index}] dd`).toBeGreaterThanOrEqual(1);
    }
    const somaAprovada = /Soma aprovada associada às AIHs E74\.0/;
    await expect(callout.getByText(somaAprovada)).toBeVisible();
    expect(await callout.locator('dl').innerText()).not.toMatch(somaAprovada);
    expect(await callout.innerText()).not.toMatch(/VAL_TOT/);
  });

  test('forbids AIH=paciente and receita=TAM equivalences in page text', async ({ page }) => {
    const body = (await page.locator('main').innerText()).toLowerCase();
    expect(body).not.toMatch(/997\s+pacientes/);
    expect(body).not.toMatch(/aih(?:s)?\s+(?:são|=)\s+pacientes?/);
    expect(body).not.toMatch(/\breceita(?:\s+observada)?\s*(?:é|=)\s*tam\b/);
    expect(body).toMatch(/aihs não equivalem a pacientes nem a prevalência/);
    expect(body).toMatch(/não de tam, sam ou som/);
    expect(body).toMatch(/mercado observado não é necessidade total/);
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

  test('keeps the legacy shell outside the Home brand-pilot', async ({ page }) => {
    await expectLegacyShell(page);
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
