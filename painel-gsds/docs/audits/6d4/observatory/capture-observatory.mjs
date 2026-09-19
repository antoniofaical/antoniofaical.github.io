import { chromium } from '@playwright/test';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots');
const origin = process.env.PLAYWRIGHT_ORIGIN ?? 'http://127.0.0.1:4321';
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

function url(pathname) {
  return new URL(pathname.replace(/^\//, ''), new URL(base, origin).toString()).toString();
}

function parseAlpha(color) {
  if (!color || color === 'transparent') return 0;
  const slash = color.match(/\/\s*([0-9.]+)\s*\)/);
  if (slash) return Number(slash[1]);
  const rgba = color.match(/rgba?\(([^)]+)\)/);
  if (!rgba) return 1;
  const parts = rgba[1].split(',').map((part) => part.trim());
  if (parts.length === 4) return Number(parts[3]);
  return 1;
}

async function fullShot(page, name) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, name), fullPage: true });
}

async function topShot(page, name) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, name), fullPage: false });
}

async function pageOverflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

async function computedProbe(page, selector) {
  return page
    .locator(selector)
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        fontFamily: style.fontFamily,
        color: style.color,
        backgroundColor: style.backgroundColor,
        borderLeftColor: style.borderLeftColor,
        borderBottomColor: style.borderBottomColor,
      };
    });
}

async function headerChrome(page) {
  const desktop = page.locator('.desktop-nav');
  const toggle = page.locator('.mobile-nav__toggle');
  const desktopDisplay = await desktop.evaluate((el) => getComputedStyle(el).display);
  const toggleBox = await toggle.evaluate((el) => {
    const style = getComputedStyle(el);
    const box = el.getBoundingClientRect();
    return { display: style.display, width: box.width, height: box.height };
  });
  return {
    desktopDisplay,
    toggleVisible: toggleBox.display !== 'none' && toggleBox.width > 0 && toggleBox.height > 0,
  };
}

async function chartPalette(page, testId) {
  const chart = page.getByTestId(testId);
  return chart.evaluate((root) => {
    const bar = root.querySelector('.startup-bar-chart__bar');
    const value = root.querySelector('.startup-bar-chart__value');
    const track = root.querySelector('.startup-bar-chart__track');
    const barStyle = bar ? getComputedStyle(bar) : null;
    const valueStyle = value ? getComputedStyle(value) : null;
    const trackStyle = track ? getComputedStyle(track) : null;
    const columns = getComputedStyle(
      root.closest('.observatory-analytics__grid'),
    ).gridTemplateColumns;
    return {
      bar: barStyle?.backgroundColor ?? '',
      value: valueStyle?.color ?? '',
      track: trackStyle?.backgroundColor ?? '',
      trackBorder: trackStyle?.borderTopColor ?? '',
      gridColumns: columns.split(' ').length,
    };
  });
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const diagnostics = {};
const chartIds = [
  'viz-01-relations',
  'viz-02-geography',
  'viz-03-direct-activity',
  'viz-04-direct-status',
];

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('inovacao/startups/'), { waitUntil: 'networkidle' });
diagnostics.observatory1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  h1: await computedProbe(page, 'h1'),
  body: await computedProbe(page, 'body'),
  header: await computedProbe(page, '.site-header'),
  researchHeader: await computedProbe(page, '.research-header'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  brandMarkCount: await page.locator('.brand__mark').count(),
  noticeCount: await page.locator('.research-header__notice').count(),
  footerNoteCount: await page.locator('.footer-note').count(),
  favicon: await page.locator('link[rel="icon"]').getAttribute('href'),
  researchHeaderClass: await page.locator('.research-header').getAttribute('class'),
  nav: await headerChrome(page),
  charts: Object.fromEntries(
    await Promise.all(chartIds.map(async (id) => [id, await chartPalette(page, id)])),
  ),
  relationBadge: await page
    .locator('.startup-badge--relation')
    .first()
    .evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        color: style.color,
        borderColor: style.borderTopColor,
        backgroundColor: style.backgroundColor,
      };
    }),
};
await fullShot(page, 'observatory-1440.png');
await page.locator('[data-testid="observatory-analytics"]').scrollIntoViewIfNeeded();
await page.locator('[data-testid="observatory-analytics"]').screenshot({
  path: path.join(outDir, 'observatory-charts-1440.png'),
});

await page.getByTestId('startup-search').fill('Abracadabra');
await page
  .getByRole('button', { name: /Ver detalhe/i })
  .first()
  .click();
await page.getByTestId('startup-detail').waitFor();
diagnostics.observatoryDetail1440 = await page.locator('.startup-detail__panel').evaluate((el) => {
  const style = getComputedStyle(el);
  return {
    backgroundColor: style.backgroundColor,
    color: style.color,
    width: el.getBoundingClientRect().width,
  };
});
await topShot(page, 'observatory-detail-1440.png');
await page.keyboard.press('Escape');

for (const width of [1152, 1024, 768]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url('inovacao/startups/'), { waitUntil: 'networkidle' });
  diagnostics[`observatory${width}`] = {
    overflow: await pageOverflow(page),
    header: await headerChrome(page),
    lockupCount: await page.locator('img.brand__lockup').count(),
  };
  await topShot(page, `observatory-${width}-top.png`);
}

async function captureMobile(width) {
  await page.setViewportSize({ width, height: 812 });
  await page.goto(url('inovacao/startups/'), { waitUntil: 'networkidle' });
  diagnostics[`observatory${width}`] = {
    overflow: await pageOverflow(page),
    h1: await computedProbe(page, 'h1'),
    header: await headerChrome(page),
    chartColumns: await page
      .locator('.observatory-analytics__grid')
      .first()
      .evaluate((el) => {
        return getComputedStyle(el).gridTemplateColumns.split(' ').length;
      }),
  };
  await topShot(page, `observatory-${width}-top.png`);

  await page.locator('.mobile-nav__toggle').click();
  await page.getByRole('dialog').waitFor();
  const menu = await page.evaluate(() => {
    const inner = document.querySelector('.mobile-nav__panel-inner');
    const style = inner ? getComputedStyle(inner) : null;
    return {
      width: inner?.getBoundingClientRect().width ?? 0,
      viewport: window.innerWidth,
      backgroundColor: style?.backgroundColor ?? '',
      overflow: document.body.style.overflow,
    };
  });
  diagnostics[`observatoryMenu${width}`] = {
    ...menu,
    alpha: parseAlpha(menu.backgroundColor),
  };
  await topShot(page, `observatory-menu-${width}.png`);
  await page.keyboard.press('Escape');

  await page.getByRole('button', { name: /Mostrar filtros/i }).click();
  await page.getByTestId('startup-filters').waitFor();
  diagnostics[`observatoryFilters${width}`] = {
    overflow: await pageOverflow(page),
    expanded: await page
      .getByRole('button', { name: /Ocultar filtros/i })
      .getAttribute('aria-expanded'),
  };
  await topShot(page, `observatory-filters-${width}.png`);

  await page.locator('[data-testid="observatory-analytics"]').scrollIntoViewIfNeeded();
  await page.locator('[data-testid="observatory-analytics"]').screenshot({
    path: path.join(outDir, `observatory-charts-${width}.png`),
  });

  await page.getByTestId('startup-search').fill('Abracadabra');
  await page
    .getByRole('button', { name: /Ver detalhe/i })
    .first()
    .click();
  await page.getByTestId('startup-detail').waitFor();
  diagnostics[`observatoryDetail${width}`] = await page
    .locator('.startup-detail__panel')
    .evaluate((el) => {
      const style = getComputedStyle(el);
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        width: el.getBoundingClientRect().width,
        overflowY: style.overflowY,
      };
    });
  await topShot(page, `observatory-detail-${width}.png`);
  await page.keyboard.press('Escape');
}

await captureMobile(375);
await captureMobile(320);

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('/'), { waitUntil: 'networkidle' });
diagnostics.homeControl1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  evidenceBadgeCount: await page.locator('.evidence-badge').count(),
  h1: await computedProbe(page, 'h1'),
};
await fullShot(page, 'home-1440-control.png');

await page.goto(url('analises/bases-clinicas/'), { waitUntil: 'networkidle' });
diagnostics.clinicalControl1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  noticeCount: await page.locator('.research-header__notice').count(),
  h1: await computedProbe(page, 'h1'),
  researchHeaderClass: await page.locator('.research-header').getAttribute('class'),
};
await fullShot(page, 'clinical-1440-control.png');

await page.goto(url('analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
diagnostics.socioControl1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  noticeCount: await page.locator('.research-header__notice').count(),
  h1: await computedProbe(page, 'h1'),
  researchHeaderClass: await page.locator('.research-header').getAttribute('class'),
};
await fullShot(page, 'socio-1440-control.png');

writeFileSync(
  path.join(__dirname, 'diagnostics.json'),
  `${JSON.stringify(diagnostics, null, 2)}\n`,
);
await browser.close();
console.log('6D.4.3 Observatory screenshots written to', outDir);
