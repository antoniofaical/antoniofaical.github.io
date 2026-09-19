import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { appBasePath } from './basePath';

const PUBLIC_ROUTES = [
  { key: 'home', path: './', researchHeader: false, notice: null as number | null },
  {
    key: 'clinical',
    path: './analises/bases-clinicas/',
    researchHeader: true,
    notice: 1,
  },
  {
    key: 'socio',
    path: './analises/impacto-socioeconomico/',
    researchHeader: true,
    notice: 0,
  },
  {
    key: 'observatory',
    path: './inovacao/startups/',
    researchHeader: true,
    notice: 0,
  },
] as const;

const OVERFLOW_WIDTHS = [1440, 1152, 1024, 768, 375, 320] as const;
const AXE_WIDTHS = [1440, 375, 320] as const;
const FORBIDDEN = [
  'VAL_TOT',
  'docs/source-of-truth',
  'fonte de verdade',
  'SoT',
  'clm-',
  'met-',
  'CAR-',
  'ECO-',
  'Projeção pública',
  'Base curada',
  'Somente relação direta.',
  'Somente o recorte direto',
  'não muda com os filtros do explorador',
];

async function navChrome(page: import('@playwright/test').Page, width: number) {
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

test.describe('6D.4 brand rollout transversal', () => {
  test('four public routes share the institutional brand-pilot shell', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(route.path);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('body'), route.key).toHaveClass(/brand-pilot/);
      await expect(page.locator('img.brand__lockup'), route.key).toHaveCount(1);
      await expect(page.locator('.brand__mark'), route.key).toHaveCount(0);
      const headingFont = await page
        .locator('h1')
        .first()
        .evaluate((el) => getComputedStyle(el).fontFamily);
      const bodyFont = await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily);
      expect(headingFont, `${route.key} h1`).toMatch(/Work Sans/i);
      expect(bodyFont, `${route.key} body`).toMatch(/Inter/i);
      const favicon = await page.locator('link[rel="icon"]').getAttribute('href');
      expect(favicon, route.key).toBe(`${appBasePath}brand/gsd-favicon.svg`);
    }
  });

  test('analytical pages keep brand ResearchHeader and page-specific notices', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      if (!route.researchHeader) {
        await expect(page.locator('.research-header')).toHaveCount(0);
        await expect(page.locator('.footer-note')).toHaveCount(0);
        continue;
      }
      await expect(page.locator('.research-header')).toHaveClass(/research-header--brand/);
      await expect(page.locator('.research-header')).not.toHaveClass(/surface-executive/);
      await expect(page.locator('.research-header__notice')).toHaveCount(route.notice ?? 0);
      await expect(page.locator('.footer-note')).toHaveCount(0);
    }
  });

  test('brand-pilot uses mobile nav below 72rem on every public route', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      expect(await navChrome(page, 1024), `${route.key} 1024`).toEqual({
        desktopVisible: false,
        toggleVisible: true,
      });
      expect(await navChrome(page, 1152), `${route.key} 1152`).toEqual({
        desktopVisible: true,
        toggleVisible: false,
      });
      expect(await navChrome(page, 1440), `${route.key} 1440`).toEqual({
        desktopVisible: true,
        toggleVisible: false,
      });
    }
  });

  test('no body overflow at required viewports on public routes', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      for (const width of OVERFLOW_WIDTHS) {
        await page.setViewportSize({ width, height: 900 });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        );
        expect(overflow, `${route.key} overflow at ${width}`).toBe(false);
      }
    }
  });

  test('has no serious accessibility violations at 1440, 375 and 320', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      for (const width of AXE_WIDTHS) {
        await page.setViewportSize({ width, height: width === 1440 ? 900 : 812 });
        const results = await new AxeBuilder({ page }).analyze();
        const blocking = results.violations.filter(
          (violation) => violation.impact === 'serious' || violation.impact === 'critical',
        );
        expect(blocking, `axe blocking ${route.key} ${width}`).toEqual([]);
      }
    }
  });

  test('rendered public text does not leak internal identifiers', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const body = await page.locator('body').innerText();
      for (const token of FORBIDDEN) {
        expect(body.includes(token), `${route.key} leakage ${token}`).toBe(false);
      }
    }
  });

  test('home keeps brand-pilot editorial invariants', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('.glycogen-branch')).toHaveCount(0);
    await expect(page.locator('.evidence-badge')).toHaveCount(0);
    await expect(page.locator('img.brand__lockup')).toHaveCount(1);
  });

  test('socio preserves DATASUS semantic amber', async ({ page }) => {
    await page.goto('./analises/impacto-socioeconomico/');
    const border = await page.locator('.datasus-callout').evaluate((el) => {
      return getComputedStyle(el).borderLeftColor;
    });
    expect(border).toBe('rgb(233, 166, 58)');
  });

  test('clinical and socio table wraps scroll internally at 320px', async ({ page }) => {
    for (const path of ['./analises/bases-clinicas/', './analises/impacto-socioeconomico/']) {
      await page.goto(path);
      await page.setViewportSize({ width: 320, height: 640 });
      const wrap = page.locator('.table-wrap');
      const metrics = await wrap.evaluate((el) => {
        const style = getComputedStyle(el);
        return {
          overflowX: style.overflowX,
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
          tabIndex: (el as HTMLElement).tabIndex,
        };
      });
      expect(['auto', 'scroll']).toContain(metrics.overflowX);
      expect(metrics.scrollWidth).toBeGreaterThan(metrics.clientWidth);
      expect(metrics.tabIndex).toBe(0);
      const bodyOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
      );
      expect(bodyOverflow, path).toBe(false);
    }
  });

  test('observatory freeze counts remain visible and snapshot-static', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    await expect(page.getByTestId('startup-summary-count')).toHaveText(
      /120 organizações nesta base/i,
    );
    const viz01 = page.getByTestId('viz-01-relations');
    await expect(viz01).toContainText('81');
    await expect(viz01).toContainText('28');
    await expect(viz01).toContainText('11');
    await expect(viz01).toContainText('0');
    await expect(page.getByTestId('viz-02-geography')).toContainText('33');
    await expect(page.getByTestId('viz-02-geography')).toContainText('88');
    await page.getByTestId('startup-filters').getByLabel('Direta às GSDs', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/28 organizações/i);
    await expect(viz01).toContainText('81');
  });

  test('public navigation does not expose design-system or SoT paths', async ({ page }) => {
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href') ?? ''));
      expect(
        hrefs.some((href) => /design-system|docs\/source-of-truth|docs\/audits/i.test(href)),
        `${route.key} leaked internal href`,
      ).toBe(false);
    }
  });

  test('same-origin links from public routes do not 404', async ({ page }) => {
    const seen = new Set<string>();
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route.path);
      const hrefs = await page
        .locator('a[href]')
        .evaluateAll((nodes) => nodes.map((node) => (node as HTMLAnchorElement).href));
      for (const href of hrefs) {
        if (!href || seen.has(href)) continue;
        const url = new URL(href);
        if (url.origin !== new URL(page.url()).origin) continue;
        if (url.protocol !== 'http:' && url.protocol !== 'https:') continue;
        seen.add(href);
        const response = await page.request.get(href);
        expect(response.status(), href).toBeLessThan(400);
      }
    }
  });
});
