import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots');
const origin = process.env.PLAYWRIGHT_ORIGIN ?? 'http://127.0.0.1:4321';
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

function url(pathname) {
  return new URL(pathname.replace(/^\//, ''), new URL(base, origin).toString()).toString();
}

async function fullShot(page, name) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, name), fullPage: true });
}

const browser = await chromium.launch();
const page = await browser.newPage();

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(url('/'), { waitUntil: 'networkidle' });
await fullShot(page, 'home-1440.png');

await page.goto(url('/analises/bases-clinicas/'), { waitUntil: 'networkidle' });
await fullShot(page, 'clinical-1440.png');
await page.getByLabel(/filtrar por padrão clínico/i).selectOption('hepatic');
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: path.join(outDir, 'clinical-filtered-1440.png'),
  fullPage: true,
});

await page.goto(url('/analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
await fullShot(page, 'socio-1440.png');

await page.goto(url('/inovacao/startups/'), { waitUntil: 'networkidle' });
await fullShot(page, 'observatory-1440.png');
await page.getByLabel('Direta às GSDs', { exact: true }).check();
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: path.join(outDir, 'observatory-filtered-1440.png'),
  fullPage: true,
});
await page
  .getByRole('button', { name: /Ver detalhe/i })
  .first()
  .click();
await page.getByTestId('startup-detail').waitFor();
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: path.join(outDir, 'observatory-drawer-1440.png'),
  fullPage: false,
});

await page.setViewportSize({ width: 375, height: 812 });
await page.goto(url('/'), { waitUntil: 'networkidle' });
await fullShot(page, 'home-375.png');
await page.locator('.mobile-nav__toggle').click();
await page.getByRole('dialog').waitFor();
await page.screenshot({
  path: path.join(outDir, 'home-menu-mobile-375.png'),
  fullPage: false,
});
await page.keyboard.press('Escape');

await page.goto(url('/analises/bases-clinicas/'), { waitUntil: 'networkidle' });
await fullShot(page, 'clinical-375.png');

await page.goto(url('/analises/impacto-socioeconomico/'), { waitUntil: 'networkidle' });
await fullShot(page, 'socio-375.png');

await page.goto(url('/inovacao/startups/'), { waitUntil: 'networkidle' });
await fullShot(page, 'observatory-375.png');

await browser.close();
console.log('6D.1 baseline screenshots written to', outDir);
