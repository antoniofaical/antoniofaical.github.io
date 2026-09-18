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
        borderBottomColor: style.borderBottomColor,
      };
    });
}

mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage();
const diagnostics = {};

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('/'), { waitUntil: 'networkidle' });
diagnostics.home1440 = {
  overflow: await pageOverflow(page),
  bodyClass: await page.locator('body').getAttribute('class'),
  h1: await computedProbe(page, '#home-hero-title'),
  body: await computedProbe(page, 'body'),
  header: await computedProbe(page, '.site-header'),
  hero: await computedProbe(page, '.home-hero'),
  context: await computedProbe(page, '.home-hero__context'),
  subtitle: await computedProbe(page, '.home-hero__subtitle'),
  primaryCta: await computedProbe(page, '.btn--on-dark'),
  evidenceBadgeCount: await page.locator('.evidence-badge').count(),
  evidenceStatesHeading: await page.getByText('Estados de evidência').count(),
  lockupCount: await page.locator('img.brand__lockup').count(),
  heroSvgCount: await page.locator('.home-hero svg').count(),
  glycogenBranchCount: await page.locator('.glycogen-branch').count(),
  heroCtaCount: await page.locator('.home-hero a.btn').count(),
  favicon: await page.locator('link[rel="icon"]').getAttribute('href'),
};
await fullShot(page, 'home-1440.png');

async function headerChrome() {
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

diagnostics.home1440.nav = await headerChrome();

for (const width of [1152, 1024, 768]) {
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url('/'), { waitUntil: 'networkidle' });
  diagnostics[`home${width}`] = {
    overflow: await pageOverflow(page),
    header: await headerChrome(),
    evidenceBadgeCount: await page.locator('.evidence-badge').count(),
  };
  await fullShot(page, `home-${width}.png`);
}

async function captureHomeMenu(width) {
  await page.setViewportSize({ width, height: 812 });
  await page.goto(url('/'), { waitUntil: 'networkidle' });
  diagnostics[`home${width}`] = {
    overflow: await pageOverflow(page),
    h1: await computedProbe(page, '#home-hero-title'),
  };
  await fullShot(page, `home-${width}.png`);
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
  diagnostics[`homeMenu${width}`] = {
    ...menu,
    alpha: parseAlpha(menu.backgroundColor),
  };
  await page.screenshot({
    path: path.join(outDir, `home-menu-mobile-${width}.png`),
    fullPage: false,
  });
  await page.keyboard.press('Escape');
}

await captureHomeMenu(375);
await captureHomeMenu(320);

writeFileSync(
  path.join(__dirname, 'diagnostics.json'),
  `${JSON.stringify(diagnostics, null, 2)}\n`,
);
await browser.close();
console.log('6D.3.3 Home screenshots written to', outDir);
