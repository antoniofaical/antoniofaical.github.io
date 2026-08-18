import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appBasePath } from './basePath';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../../dist');

test.describe('observatorio startups', () => {
  test('route renders brazil-indirect snapshot with coverage limits', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    // Negative proof against a root server answering when BASE_PATH is the Pages subpath.
    if (appBasePath === '/painel-gsds/') {
      expect(page.url()).toContain('/painel-gsds/inovacao/startups/');
    }
    await expect(
      page.getByRole('heading', { name: /Observatório de startups em glicogenoses/i }),
    ).toBeVisible();
    await expect(page.getByTestId('startup-empty-state')).toHaveCount(0);
    await expect(page.getByTestId('startup-coverage-notice')).toBeVisible();
    await expect(page.getByText(/33 organizações/i).first()).toBeVisible();
    await expect(page.getByText(/Validação no CB Insights permanece pendente/i)).toBeVisible();
    await expect(page.getByText(/HelixGlyph Labs \(SYNTHETIC FIXTURE\)/i)).toHaveCount(0);
    await expect(page.getByText(/solução GSD-direta/i)).toBeVisible();
  });

  test('search filters and detail drawer work on real data', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    await page.getByTestId('startup-search').fill('Abracadabra');
    await expect(page.getByRole('status')).toContainText(/1 organização/i);
    await page
      .getByRole('button', { name: /Ver detalhe/i })
      .first()
      .click();
    const dialog = page.getByTestId('startup-detail');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByText(/Produtos e programas não foram modelados/i)).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('startup-detail')).toHaveCount(0);
  });

  test('global nav and home portal point to the route', async ({ page }) => {
    await page.goto('./');
    await expect(
      page.getByRole('navigation', { name: /Principal/i }).getByRole('link', {
        name: /Observatório de startups/i,
      }),
    ).toBeVisible();
    await page.getByRole('link', { name: /Abrir observatório de startups/i }).click();
    await expect(page).toHaveURL(/\/inovacao\/startups\/?$/);
    if (appBasePath === '/painel-gsds/') {
      expect(page.url()).toContain('/painel-gsds/inovacao/startups/');
    }

    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    await page.locator('.mobile-nav__toggle').click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('link', { name: /Observatório de startups/i })).toBeVisible();
  });

  test('has no serious accessibility violations', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('no horizontal overflow at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto('./inovacao/startups/');
    const overflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 1;
    });
    expect(overflow).toBe(false);
  });

  test('production build excludes fixtures and raw scouting artifacts', async () => {
    const markers = [
      'HelixGlyph Labs (SYNTHETIC FIXTURE)',
      'Amazon Care Bridge (SYNTHETIC FIXTURE)',
      'snap-synth-fixture-valid',
      'org-synth-helix-glyph-labs',
      'example.invalid/synth-helix-glyph',
      'GSD_Brazil_Startup_Longlist.csv',
      'CB_Insights_Brazil_Validation_Queue.csv',
      'Brazil Candidate ID',
      'Pre-CB Insights disposition',
    ];

    function walk(dir: string): string[] {
      const entries = readdirSync(dir);
      const files: string[] = [];
      for (const entry of entries) {
        const full = path.join(dir, entry);
        if (statSync(full).isDirectory()) files.push(...walk(full));
        else files.push(full);
      }
      return files;
    }

    const files = walk(distDir).filter((file) => /\.(html|js|mjs|css|json|txt|svg)$/i.test(file));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      for (const marker of markers) {
        expect(content.includes(marker), `${marker} leaked into ${file}`).toBe(false);
      }
    }
  });
});
