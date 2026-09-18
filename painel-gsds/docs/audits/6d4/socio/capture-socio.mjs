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

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const diagnostics = {};

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
diagnostics.socio1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  h1: await computedProbe(page, 'h1'),
  body: await computedProbe(page, 'body'),
  header: await computedProbe(page, '.site-header'),
  researchHeader: await computedProbe(page, '.research-header'),
  eyebrow: await computedProbe(page, '.research-header__eyebrow'),
  summary: await computedProbe(page, '.research-header__summary'),
  datasus: await computedProbe(page, '.datasus-callout'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  brandMarkCount: await page.locator('.brand__mark').count(),
  noticeCount: await page.locator('.research-header__notice').count(),
  footerNoteCount: await page.locator('.footer-note').count(),
  evidenceBadgeCount: await page.locator('.evidence-badge').count(),
  favicon: await page.locator('link[rel="icon"]').getAttribute('href'),
  researchHeaderClass: await page.locator('.research-header').getAttribute('class'),
  nav: await headerChrome(page),
};
await fullShot(page, 'socio-1440.png');
await page.locator('.datasus-callout').scrollIntoViewIfNeeded();
await page.locator('.datasus-callout').screenshot({
  path: path.join(outDir, 'socio-datasus-1440.png'),
});

for (const width of [1152, 1024, 768]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url('analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
  diagnostics[`socio${width}`] = {
    overflow: await pageOverflow(page),
    header: await headerChrome(page),
    lockupCount: await page.locator('img.brand__lockup').count(),
  };
  await fullShot(page, `socio-${width}.png`);
}

async function captureSocioMenu(width) {
  await page.setViewportSize({ width, height: 812 });
  await page.goto(url('analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
  diagnostics[`socio${width}`] = {
    overflow: await pageOverflow(page),
    h1: await computedProbe(page, 'h1'),
    header: await headerChrome(page),
  };
  await fullShot(page, `socio-${width}.png`);
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
  diagnostics[`socioMenu${width}`] = {
    ...menu,
    alpha: parseAlpha(menu.backgroundColor),
  };
  await page.screenshot({
    path: path.join(outDir, `socio-menu-${width}.png`),
    fullPage: false,
  });
  await page.keyboard.press('Escape');
}

await captureSocioMenu(375);
await captureSocioMenu(320);

await page.setViewportSize({ width: 320, height: 640 });
await page.goto(url('analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
await page.locator('.table-wrap').scrollIntoViewIfNeeded();
const table = page.locator('.table-wrap');
diagnostics.socioSegments320 = {
  overflow: await pageOverflow(page),
  wrap: await table.evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      overflowX: style.overflowX,
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
      tabIndex: el.tabIndex,
    };
  }),
};
await table.screenshot({ path: path.join(outDir, 'socio-segments-320.png') });

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('/'), { waitUntil: 'networkidle' });
diagnostics.homeControl1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  glycogenBranchCount: await page.locator('.glycogen-branch').count(),
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

await page.goto(url('inovacao/startups/'), { waitUntil: 'networkidle' });
diagnostics.observatoryControl1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  lockupCount: await page.locator('img.brand__lockup').count(),
  brandMarkCount: await page.locator('.brand__mark').count(),
  h1: await computedProbe(page, 'h1'),
  researchHeaderClass: await page.locator('.research-header').getAttribute('class'),
};
await fullShot(page, 'observatory-1440-control.png');

writeFileSync(
  path.join(__dirname, 'diagnostics.json'),
  `${JSON.stringify(diagnostics, null, 2)}\n`,
);
await browser.close();
console.log('6D.4.2 Socio screenshots written to', outDir);
