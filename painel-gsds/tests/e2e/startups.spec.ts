import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { appBasePath } from './basePath';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../../dist');

test.describe('observatorio startups', () => {
  test('route renders cumulative snapshot with coverage limits', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    if (appBasePath === '/painel-gsds/') {
      expect(page.url()).toContain('/painel-gsds/inovacao/startups/');
    }
    await expect(
      page.getByRole('heading', { name: /Observatório de startups em glicogenoses/i }),
    ).toBeVisible();
    await expect(page.getByTestId('startup-empty-state')).toHaveCount(0);
    await expect(page.getByTestId('startup-coverage-notice')).toBeVisible();
    await expect(page.getByText(/120 organizações/i).first()).toBeVisible();
    await expect(page.getByText(/28 organizações com relação direta/i)).toBeVisible();
    await expect(
      page.getByText(/relações diretas, adjacentes e de relevância ainda não confirmada/i),
    ).toBeVisible();
    await expect(page.getByText(/Sobre os dados/i)).toBeVisible();
    await expect(page.getByText(/ResearchRun/i)).toHaveCount(0);
    await expect(page.getByText(/ChangeSet/i)).toHaveCount(0);
    await expect(page.getByText(/PublishedSnapshot/i)).toHaveCount(0);
    await expect(page.getByText(/protocolVersion/i)).toHaveCount(0);
    await expect(page.getByText(/Iteração 5B/i)).toHaveCount(0);
    await expect(page.getByText(/CB Insights/i)).toHaveCount(0);
    await expect(page.getByText(/snap-ecosystem-cumulative-direct/i)).toHaveCount(0);
    await expect(page.getByText(/gsd_direct_global_scouting ainda não integra/i)).toHaveCount(0);
    await expect(page.getByText(/HelixGlyph Labs \(SYNTHETIC FIXTURE\)/i)).toHaveCount(0);
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
    await expect(
      dialog.getByText(/ativos e programas são apresentados no contexto da organização/i),
    ).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('startup-detail')).toHaveCount(0);

    await page.getByTestId('startup-search').fill('ThinkGenetic');
    await expect(page.getByRole('status')).toContainText(/1 organização/i);

    await page.getByTestId('startup-search').fill('');
    const filters = page.getByTestId('startup-filters');
    await filters.getByLabel('Direta às GSDs', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/28 organizações/i);
    await filters.getByLabel('Direta às GSDs', { exact: true }).uncheck();
    await filters.getByLabel('Brasil', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/33 organizações/i);
    await filters.getByLabel('Brasil', { exact: true }).uncheck();
    await filters.getByLabel('Global', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/88 organizações/i);
    await filters.getByLabel('Global', { exact: true }).uncheck();

    await page.getByTestId('startup-search').fill('Saventic');
    await expect(page.getByRole('status')).toContainText(/1 organização/i);
    await page
      .getByRole('button', { name: /Ver detalhe/i })
      .first()
      .click();
    const saventic = page.getByTestId('startup-detail');
    await expect(saventic).toBeVisible();
    await expect(saventic.getByText('Brasil', { exact: true })).toBeVisible();
    await expect(saventic.getByText('Global', { exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
  });

  test('direct players are searchable and sensitive cases stay qualified', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    const filters = page.getByTestId('startup-filters');
    await filters.getByLabel('Direta às GSDs', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/28 organizações/i);

    async function openDirect(query: string) {
      await page.getByTestId('startup-search').fill(query);
      await expect(page.getByRole('status')).toContainText(/1 organização/i);
      await page
        .getByRole('button', { name: /Ver detalhe/i })
        .first()
        .click();
      const detail = page.getByTestId('startup-detail');
      await expect(detail).toBeVisible();
      await expect(detail.getByTestId('startup-direct-context')).toBeVisible();
      const body = (await detail.innerText()).toLowerCase();
      expect(body).not.toContain('gsd-dir-');
      expect(body).not.toContain('historical_owner');
      expect(body).not.toContain('scouting_approved');
      expect(body).not.toContain('proprietária histórica');
      expect(body).not.toContain('titular histórica');
      return detail;
    }

    await openDirect('Cometa Therapeutics');
    await page.keyboard.press('Escape');

    const actus = await openDirect('Actus Therapeutics');
    await expect(actus.getByText(/^Histórica$/i)).toBeVisible();
    await expect(
      actus.getByTestId('startup-direct-context').getByText(/Adquirida ou inativa/i),
    ).toBeVisible();
    await page.keyboard.press('Escape');

    await openDirect('AskBio');
    await page.keyboard.press('Escape');

    await openDirect('Reneo Pharmaceuticals');
    await page.keyboard.press('Escape');

    const maze = await openDirect('Maze Therapeutics');
    await expect(maze.getByText(/Titular histórico do ativo/i)).toBeVisible();
    await expect(maze.getByRole('heading', { name: /Site institucional/i })).toBeVisible();
    await expect(maze.getByRole('link', { name: /mazetx\.com/i })).toBeVisible();
    await page.keyboard.press('Escape');

    const valerion = await openDirect('Valerion Therapeutics');
    await expect(valerion.getByText(/Titular histórico do ativo/i)).toBeVisible();
    await expect(valerion.getByText(/^Histórica$/i)).toBeVisible();
    await page.keyboard.press('Escape');

    const kriya = await openDirect('Kriya Therapeutics');
    await expect(kriya.getByText(/titularidade não estabelecida/i)).toBeVisible();
    await expect(kriya.getByText(/atividade atual incerta/i)).toBeVisible();
    expect((await kriya.innerText()).toLowerCase()).not.toMatch(/\bowner\b/);
    expect((await kriya.innerText()).toLowerCase()).not.toContain('titular histórico do ativo');
    await page.keyboard.press('Escape');

    const aug = await openDirect('AUG Therapeutics');
    await expect(aug.getByText(/Licenciado a terceiro/i)).toBeVisible();
    await expect(aug.getByText(/^Licenciado$/i)).toHaveCount(0);
    await expect(aug.getByText(/atividade atual incerta/i)).toBeVisible();
    await page.keyboard.press('Escape');

    const parasail = await openDirect('Parasail');
    await expect(parasail.getByText(/detentor de licença/i)).toBeVisible();
    await expect(parasail.getByText(/^Titular$/)).toHaveCount(0);
    await page.keyboard.press('Escape');
  });

  test('all 28 direct drawers open and close', async ({ page }) => {
    await page.goto('./inovacao/startups/');
    const filters = page.getByTestId('startup-filters');
    await filters.getByLabel('Direta às GSDs', { exact: true }).check();
    await expect(page.getByRole('status')).toContainText(/28 organizações/i);

    const cards = page.locator('[data-testid="startup-card"]');
    await expect(cards).toHaveCount(28);

    for (let i = 0; i < 28; i += 1) {
      const card = cards.nth(i);
      const name = (await card.locator('h3').innerText()).trim();
      await card.getByRole('button', { name: /Ver detalhe/i }).click();
      const detail = page.getByTestId('startup-detail');
      await expect(detail).toBeVisible();
      await expect(detail.getByRole('heading', { level: 2 })).toHaveText(name);
      await detail.getByRole('button', { name: /Fechar detalhe/i }).click();
      await expect(page.getByTestId('startup-detail')).toHaveCount(0);
    }
  });

  test('global nav and home portal point to the route', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByText(/Visão executiva · Iteração 2/i)).toHaveCount(0);
    await expect(page.getByText(/PublishedSnapshot/i)).toHaveCount(0);
    await expect(page.getByText(/CB Insights/i)).toHaveCount(0);
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
      'GSD_Indirect_Startup_Longlist.md',
      'Advanced_Company_Search_Validation_Queue.csv',
      'gsd_indirect_scouting-integrity-fixed-pre5C',
      'GSD_DIRECT_DASHBOARD_MINIMAL.csv',
      'GSD_DIRECT_DASHBOARD_EVIDENCE.csv',
      'SCOUTING_APPROVED',
      'HISTORICAL_OWNER',
      'GSD_DIRECT_DASHBOARD_MINIMAL.csv',
      'GSD_DIRECT_DASHBOARD_EVIDENCE.csv',
      'ResearchRun',
      'ChangeSet',
      'PublishedSnapshot',
      'Iteração 5B',
      'sps-gsd-dir-',
      'Cobertura do snapshot',
      'Nenhuma organização neste snapshot.',
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

    const files = walk(distDir).filter((file) => /\.(html|js|mjs|css|txt|svg)$/i.test(file));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      for (const marker of markers) {
        expect(content.includes(marker), `${marker} leaked into ${file}`).toBe(false);
      }
    }
  });
});
