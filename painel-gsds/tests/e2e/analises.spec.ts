import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appBasePath } from './basePath';
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
    const search = page.getByLabel(/buscar por nome/i);
    const status = page.getByRole('status');

    await select.selectOption('muscular');
    await expect(status).toContainText(/de \d+ condições/i);
    await search.fill('Pompe');
    await expect(page.getByRole('heading', { name: /Pompe/i }).first()).toBeVisible();

    await search.fill('zzzz-no-match');
    await expect(status).toHaveText('Nenhuma GSD corresponde aos filtros.');

    await search.fill('');
    await select.selectOption('all');
    await expect(status).toContainText(/de \d+ condições/i);
  });

  test('section nav anchors and breadcrumbs remain intact', async ({ page }) => {
    await page
      .getByRole('navigation', { name: 'Nesta página' })
      .getByRole('link', { name: 'Órgãos descritos' })
      .click();
    await expect(page).toHaveURL(/#orgaos$/);
    await expect(page.locator('#orgaos')).toBeVisible();
    const breadcrumbs = page.getByRole('navigation', { name: 'Trilha de navegação' });
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.getByRole('link', { name: 'Início', exact: true })).toBeVisible();
  });

  test('has no serious accessibility violations at 1440, 375 and 320', async ({ page }) => {
    for (const width of [1440, 375, 320] as const) {
      await page.setViewportSize({ width, height: width === 1440 ? 900 : 812 });
      const results = await new AxeBuilder({ page }).analyze();
      const blocking = results.violations.filter(
        (violation) => violation.impact === 'serious' || violation.impact === 'critical',
      );
      expect(blocking, `axe blocking at ${width}`).toEqual([]);
    }
  });

  test('no horizontal overflow at required viewports', async ({ page }) => {
    for (const width of [1440, 1152, 1024, 768, 375, 320] as const) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(overflow, `overflow at ${width}px`).toBe(false);
    }
  });

  test('table wrapper can scroll internally at 320px without body overflow', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    const metrics = await page.locator('.table-wrap').evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        overflowX: style.overflowX,
        clientWidth: el.clientWidth,
        scrollWidth: el.scrollWidth,
      };
    });
    expect(['auto', 'scroll']).toContain(metrics.overflowX);
    const bodyOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    );
    expect(bodyOverflow).toBe(false);
  });

  test('uses the Home-approved brand-pilot shell', async ({ page }) => {
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('body')).toHaveClass(/brand-pilot/);
    await expect(page.locator('img.brand__lockup')).toHaveCount(1);
    await expect(page.locator('.brand__mark')).toHaveCount(0);
    const headingFont = await page
      .locator('h1')
      .first()
      .evaluate((el) => getComputedStyle(el).fontFamily);
    const bodyFont = await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily);
    expect(headingFont).toMatch(/Work Sans/i);
    expect(bodyFont).toMatch(/Inter/i);
    const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
    expect(favicon).toBe(`${appBasePath}brand/gsd-favicon.svg`);
    await expect(page.locator('.research-header')).toHaveClass(/research-header--brand/);
    await expect(page.locator('.research-header')).not.toHaveClass(/surface-executive/);
  });

  test('brand-pilot uses mobile nav below 72rem and desktop nav from 72rem', async ({ page }) => {
    async function navChrome(width: number) {
      await page.setViewportSize({ width, height: 900 });
      await page.evaluate(() => document.fonts.ready);
      const desktop = page.locator('.desktop-nav');
      const toggle = page.locator('.mobile-nav__toggle');
      const desktopVisible = await desktop.evaluate((el) => {
        const style = getComputedStyle(el);
        const box = el.getBoundingClientRect();
        return style.display !== 'none' && box.width > 0 && box.height > 0;
      });
      const toggleVisible = await toggle.evaluate((el) => {
        const style = getComputedStyle(el);
        const box = el.getBoundingClientRect();
        return style.display !== 'none' && box.width > 0 && box.height > 0;
      });
      return { desktopVisible, toggleVisible };
    }

    expect(await navChrome(1024)).toEqual({ desktopVisible: false, toggleVisible: true });
    expect(await navChrome(1152)).toEqual({ desktopVisible: true, toggleVisible: false });
    expect(await navChrome(1440)).toEqual({ desktopVisible: true, toggleVisible: false });
  });

  test('mobile menu opens, locks body scroll, and returns focus on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const toggle = page.locator('.mobile-nav__toggle');
    await toggle.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    const overflow = await page.evaluate(() => document.body.style.overflow);
    expect(overflow).toBe('hidden');
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(toggle).toBeFocused();
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
