import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appBasePath } from './basePath';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const shotsDir = path.resolve(__dirname, '../visual');

test.describe('home executive', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./');
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
    await expect(page.getByText(/≈ €1,4 bilhão/i).first()).toBeVisible();
    await expect(page.getByText(/≈ €1,4 bi bilhões/i)).toHaveCount(0);
    await expect(page.getByText('997').first()).toBeVisible();
    await expect(page.getByText('AIHs').first()).toBeVisible();
    await expect(page.getByText('29').first()).toBeVisible();
    await expect(
      page.locator('.key-metric__limitation', { hasText: /não de TAM, SAM ou SOM/i }),
    ).toBeVisible();
    await expect(
      page.locator('.key-metric__limitation', { hasText: /AIHs não equivalem a pacientes/i }),
    ).toBeVisible();
    const homeText = await page.locator('main').innerText();
    expect(homeText).not.toMatch(/SoT/);
    expect(homeText).not.toMatch(/CAR-/);
    expect(homeText).not.toMatch(/ECO-/);
    expect(homeText).not.toMatch(/clm-/);
    expect(homeText).not.toMatch(/met-/);
    expect(homeText).not.toMatch(/docs\/source-of-truth/);
    expect(homeText).toMatch(/estudo documentado na síntese socioeconômica/);
    expect(homeText).toMatch(/1\.1 \/ McArdle — atraso mediano de 29 anos/);
    expect(homeText).not.toMatch(/\[CAR-010 a CAR-013\]/);
  });

  test('analysis portals navigate to clinical and socioeconomic pages', async ({ page }) => {
    await expect(page.getByRole('link', { name: /abrir bases clínicas/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /abrir impacto socioeconômico/i })).toBeVisible();
    await page.getByRole('link', { name: /abrir bases clínicas/i }).click();
    await expect(page).toHaveURL(/\/analises\/bases-clinicas\/?$/);
    await page.goto('./');
    await page.getByRole('link', { name: /abrir impacto socioeconômico/i }).click();
    await expect(page).toHaveURL(/\/analises\/impacto-socioeconomico\/?$/);
    await page.goto('./');
    const developing = page.getByRole('status').filter({ hasText: /em desenvolvimento/i });
    await expect(developing).toHaveCount(0);
    await expect(page.getByRole('link', { name: /abrir observatório de startups/i })).toBeVisible();
    const homeText = await page.locator('main').innerText();
    expect(homeText).not.toMatch(/avaliação (médica|clínica) individual/i);
    expect(homeText).not.toMatch(/não substitui avaliação médica/i);
    expect(homeText).not.toMatch(/não substitutivo de avaliação médica/i);
    await expect(page.locator('.footer-note')).toHaveCount(0);
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

  test('home brand-pilot uses institutional lockup, Work Sans and no evidence badges', async ({
    page,
  }) => {
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('body')).toHaveClass(/brand-pilot/);

    const lockup = page.locator('img.brand__lockup');
    await expect(lockup).toBeVisible();
    await expect(page.locator('.brand__mark')).toHaveCount(0);
    const lockupSrc = await lockup.getAttribute('src');
    expect(lockupSrc).toBe(`${appBasePath}brand/eretz-einstein-lockup.svg`);
    const lockupLoaded = await lockup.evaluate(
      (el) => el instanceof HTMLImageElement && el.complete && el.naturalWidth > 0,
    );
    expect(lockupLoaded).toBe(true);

    const headingFont = await page.locator('#home-hero-title').evaluate((el) => {
      return getComputedStyle(el).fontFamily;
    });
    const bodyFont = await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily);
    expect(headingFont).toMatch(/Work Sans/i);
    expect(bodyFont).toMatch(/Inter/i);

    await expect(page.locator('.evidence-badge')).toHaveCount(0);
    await expect(page.getByText('Estados de evidência')).toHaveCount(0);
    await expect(page.getByRole('heading', { name: 'Atualização' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Limitações gerais desta Home' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Fontes utilizadas pela Home' })).toBeVisible();

    const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
    expect(favicon).toBe(`${appBasePath}brand/gsd-favicon.svg`);

    await expect(
      page.getByRole('heading', {
        name: /Glicogenoses: uma família de doenças, múltiplas jornadas/i,
      }),
    ).toBeVisible();
    await expect(page.getByText('Visão executiva').first()).toBeVisible();
    await expect(
      page.getByText(
        /O painel reúne contexto clínico, impacto socioeconômico e organizações relacionadas às GSDs/i,
      ),
    ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Entender o problema' })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Ver como os dados foram tratados' }),
    ).toBeVisible();
  });

  test('home brand-pilot mobile menu is opaque and full-width on small viewports', async ({
    page,
  }) => {
    for (const width of [375, 320] as const) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto('./');
      const toggle = page.locator('.mobile-nav__toggle');
      await toggle.click();
      await expect(page.getByRole('dialog')).toBeVisible();

      const metrics = await page.evaluate(() => {
        const inner = document.querySelector('.mobile-nav__panel-inner');
        if (!(inner instanceof HTMLElement)) {
          return { width: 0, viewport: window.innerWidth, alpha: 0, overflow: '' };
        }
        const color = getComputedStyle(inner).backgroundColor;
        const parts = color
          .replace(/[rgba()]/g, '')
          .split(',')
          .map((part) => Number(part.trim()));
        const alpha = parts.length === 4 ? parts[3] : 1;
        return {
          width: inner.getBoundingClientRect().width,
          viewport: window.innerWidth,
          alpha,
          overflow: document.body.style.overflow,
        };
      });

      expect(metrics.width).toBeGreaterThanOrEqual(metrics.viewport - 1);
      expect(metrics.alpha).toBe(1);
      expect(metrics.overflow).toBe('hidden');

      await page.keyboard.press('Escape');
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(toggle).toBeFocused();
    }
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

    await page.setViewportSize({ width: 1152, height: 900 });
    const wrapping = await page.locator('.desktop-nav .nav-item').evaluateAll((els) =>
      els.map((el) => {
        const style = getComputedStyle(el);
        const lineHeight =
          Number.parseFloat(style.lineHeight) || Number.parseFloat(style.fontSize) * 1.2;
        const pad = Number.parseFloat(style.paddingTop) + Number.parseFloat(style.paddingBottom);
        const minHeight = Number.parseFloat(style.minHeight) || 0;
        return {
          label: (el.textContent ?? '').replace(/\s+/g, ' ').trim(),
          height: el.getBoundingClientRect().height,
          oneLineMax: Math.max(minHeight, lineHeight + pad) + 4,
        };
      }),
    );
    for (const item of wrapping) {
      expect(item.height, `${item.label} wraps at 1152`).toBeLessThanOrEqual(item.oneLineMax);
    }
  });

  test('no horizontal overflow at 375px, 768px, 1024px, 1152px and 1440px', async ({ page }) => {
    for (const width of [375, 768, 1024, 1152, 1440] as const) {
      await page.setViewportSize({ width, height: 900 });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
      });
      expect(overflow, `overflow at ${width}px`).toBe(false);
    }
  });
});
