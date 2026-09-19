import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, 'screenshots');
const painelRoot = path.resolve(__dirname, '../../../../');
const origin = process.env.PLAYWRIGHT_ORIGIN ?? 'http://127.0.0.1:4321';
const base = (process.env.BASE_PATH ?? '/').replace(/\/?$/, '/');

const ROUTES = [
  { key: 'home', path: '/', shot: 'home' },
  { key: 'clinical', path: 'analises/bases-clinicas/', shot: 'clinical' },
  { key: 'socio', path: 'analises/impacto-socioeconomico/', shot: 'socio' },
  { key: 'observatory', path: 'inovacao/startups/', shot: 'observatory' },
];

const OVERFLOW_WIDTHS = [1440, 1152, 1024, 768, 375, 320];
const AXE_WIDTHS = [1440, 375, 320];
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

function pageUrl(pathname) {
  return new URL(pathname.replace(/^\//, ''), new URL(base, origin).toString()).toString();
}

function sha256File(filePath) {
  return createHash('sha256').update(readFileSync(filePath)).digest('hex');
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

async function pageOverflow(page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
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

const snapshot = JSON.parse(
  readFileSync(
    path.join(
      painelRoot,
      'src/data/startups/published/snapshots/ecosystem-cumulative-direct-2026-08-24.json',
    ),
    'utf8',
  ),
);

const facts = {
  baselineSha: '59f22297d26fdf20556b889e77dfa5fe4650583a',
  branch: 'cursor/iteracao-6d44-final-transversal-qa',
  workingTreeState: 'uncommitted-test-and-audit-artifacts-only',
  assetHashes: {
    lockup: sha256File(path.join(painelRoot, 'public/brand/eretz-einstein-lockup.svg')),
    workSans: sha256File(path.join(painelRoot, 'public/fonts/work-sans-latin-variable.woff2')),
    workSansOfl: sha256File(path.join(painelRoot, 'public/fonts/licenses/work-sans-OFL.txt')),
    favicon: sha256File(path.join(painelRoot, 'public/brand/gsd-favicon.svg')),
  },
  sotHashes: {
    socio: sha256File(
      path.join(
        painelRoot,
        'docs/source-of-truth/Glicogenose Estudo Socioeconômico Mercadológico.md',
      ),
    ),
    medical: sha256File(
      path.join(painelRoot, 'docs/source-of-truth/Glicogenose Resumo Médico Executivo.md'),
    ),
    designSystem: sha256File(
      path.join(painelRoot, 'docs/source-of-truth/Design_System_Painel_Glicogenoses.md'),
    ),
    inventory: sha256File(path.join(painelRoot, 'docs/source-of-truth/INVENTORY.md')),
  },
  snapshot: {
    organizations: snapshot.counts.organizations,
    assessments: snapshot.counts.relevanceAssessments,
    sources: snapshot.counts.publicSources,
    products: snapshot.counts.productsOrPrograms,
    checksum: snapshot.checksum,
  },
  routeMatrix: {},
  fonts: {},
  lockupCount: {},
  brandMarkCount: {},
  favicon: {},
  researchHeader: {},
  noticeCount: {},
  navMatrix: {},
  bodyOverflow: {},
  axe: {},
  consoleErrors: {},
  pageErrors: {},
  failedSameOriginRequests: {},
  sameOriginStatus400: {},
  forbiddenPublicStrings: {},
  fontNetwork: { externalGoogleFonts: [], gstatic: [] },
  identityDrift: {},
  sameOriginLinks: [],
  tableWraps: {},
  chartCounts: {},
  screenshotHashes: {},
  sameOriginLinkStatuses: [],
  sameOrigin404: [],
  screenshotComparison: {},
  menu320: {},
};

const inferences = [];
const pendings = [
  'FORMAL_INSTITUTIONAL_AUTHORIZATION_PENDING',
  'PENDING_OG_ASSET',
  'FAVICON_DEFERRED_REFINEMENT',
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();

const consoleErrors = [];
const pageErrors = [];
const failedRequests = [];
const status400 = [];
const externalFonts = [];

page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push({ text: msg.text(), url: page.url() });
});
page.on('pageerror', (error) => {
  pageErrors.push({ message: String(error), url: page.url() });
});
page.on('requestfailed', (request) => {
  const requestUrl = request.url();
  if (requestUrl.startsWith(origin)) {
    failedRequests.push({
      url: requestUrl,
      error: request.failure()?.errorText ?? 'unknown',
    });
  }
});
page.on('response', (response) => {
  const responseUrl = response.url();
  if (responseUrl.startsWith(origin) && response.status() >= 400) {
    status400.push({ url: responseUrl, status: response.status() });
  }
});
page.on('request', (request) => {
  const requestUrl = request.url();
  if (/fonts\.googleapis\.com/i.test(requestUrl)) externalFonts.push(requestUrl);
  if (/fonts\.gstatic\.com/i.test(requestUrl)) externalFonts.push(requestUrl);
});

const collectedHrefs = new Set();

for (const route of ROUTES) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl(route.path), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const h1 = page.locator('h1').first();
  facts.fonts[route.key] = {
    h1: await h1.evaluate((el) => getComputedStyle(el).fontFamily),
    body: await page.locator('body').evaluate((el) => getComputedStyle(el).fontFamily),
  };
  facts.lockupCount[route.key] = await page.locator('img.brand__lockup').count();
  facts.brandMarkCount[route.key] = await page.locator('.brand__mark').count();
  facts.favicon[route.key] = await page.locator('link[rel="icon"]').getAttribute('href');
  const researchHeaderCount = await page.locator('.research-header').count();
  facts.researchHeader[route.key] = {
    count: researchHeaderCount,
    className:
      researchHeaderCount > 0
        ? await page.locator('.research-header').first().getAttribute('class')
        : null,
    hasBrand: await page.locator('.research-header--brand').count(),
    hasExecutive: await page.locator('.research-header.surface-executive').count(),
  };
  facts.noticeCount[route.key] = {
    researchHeaderNotice: await page.locator('.research-header__notice').count(),
    footerNote: await page.locator('.footer-note').count(),
  };
  facts.routeMatrix[route.key] = {
    brandPilot: await page.locator('body').evaluate((el) => el.classList.contains('brand-pilot')),
    glycogenBranch: await page.locator('.glycogen-branch').count(),
    evidenceBadge: await page.locator('.evidence-badge').count(),
  };
  facts.identityDrift[route.key] = await page.evaluate(() => {
    const probes = [
      document.body,
      document.querySelector('.site-header'),
      document.querySelector('h1'),
    ];
    return probes.map((el) => {
      if (!el) return null;
      const style = getComputedStyle(el);
      return {
        tag: el.tagName,
        backgroundImage: style.backgroundImage,
      };
    });
  });

  const bodyText = await page.locator('body').innerText();
  facts.forbiddenPublicStrings[route.key] = FORBIDDEN.filter((token) => bodyText.includes(token));

  const hrefs = await page
    .locator('a[href]')
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href') ?? ''));
  facts.sameOriginLinks.push({
    route: route.key,
    leakedInternal: hrefs.filter((href) =>
      /design-system|docs\/source-of-truth|docs\/audits/i.test(href),
    ),
    hrefs,
  });
  for (const href of hrefs) {
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    try {
      collectedHrefs.add(new URL(href, page.url()).toString());
    } catch {
      /* ignore invalid */
    }
  }

  facts.navMatrix[route.key] = {};
  facts.bodyOverflow[route.key] = {};
  for (const width of OVERFLOW_WIDTHS) {
    await page.setViewportSize({ width, height: width <= 375 ? 812 : 900 });
    facts.navMatrix[route.key][width] = await headerChrome(page);
    facts.bodyOverflow[route.key][width] = await pageOverflow(page);
  }

  facts.axe[route.key] = {};
  for (const width of AXE_WIDTHS) {
    await page.setViewportSize({ width, height: width === 1440 ? 900 : 812 });
    const results = await new AxeBuilder({ page }).analyze();
    facts.axe[route.key][width] = results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      nodes: violation.nodes.map((node) => ({
        target: node.target,
        html: node.html.slice(0, 240),
      })),
    }));
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(pageUrl(route.path), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${route.shot}-1440.png`), fullPage: true });
  await page.setViewportSize({ width: 320, height: 812 });
  await page.goto(pageUrl(route.path), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(outDir, `${route.shot}-320.png`), fullPage: false });
}

await page.setViewportSize({ width: 320, height: 812 });
await page.goto(pageUrl('/'), { waitUntil: 'networkidle' });
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
facts.menu320 = { ...menu, alpha: parseAlpha(menu.backgroundColor) };
await page.screenshot({ path: path.join(outDir, 'menu-320.png'), fullPage: false });
await page.keyboard.press('Escape');

for (const wrapRoute of [
  { key: 'clinical', path: 'analises/bases-clinicas/' },
  { key: 'socio', path: 'analises/impacto-socioeconomico/' },
]) {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(pageUrl(wrapRoute.path), { waitUntil: 'networkidle' });
  facts.tableWraps[wrapRoute.key] = await page.locator('.table-wrap').evaluate((el) => {
    const style = getComputedStyle(el);
    return {
      overflowX: style.overflowX,
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
      tabIndex: el.tabIndex,
    };
  });
}

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(pageUrl('inovacao/startups/'), { waitUntil: 'networkidle' });
const viz01 = await page.getByTestId('viz-01-relations').innerText();
const viz02 = await page.getByTestId('viz-02-geography').innerText();
const viz03 = await page.getByTestId('viz-03-direct-activity').innerText();
const viz04 = await page.getByTestId('viz-04-direct-status').innerText();
facts.chartCounts = {
  viz01Text: viz01.replace(/\s+/g, ' ').trim(),
  viz02Text: viz02.replace(/\s+/g, ' ').trim(),
  viz03Text: viz03.replace(/\s+/g, ' ').trim(),
  viz04Text: viz04.replace(/\s+/g, ' ').trim(),
  contains: {
    adjacent81: viz01.includes('81'),
    direct28: viz01.includes('28'),
    unconfirmed11: viz01.includes('11'),
    ecosystem0: /\b0\b/.test(viz01),
    brazil33: viz02.includes('33'),
    global88: viz02.includes('88'),
    current13: viz03.includes('13'),
    uncertain4: viz03.includes('4'),
    historical11: viz03.includes('11'),
    private8: viz04.includes('8'),
    public9: viz04.includes('9'),
    acquired9: viz04.includes('9'),
    unresolved2: viz04.includes('2'),
  },
};

const linkStatuses = [];
for (const href of collectedHrefs) {
  const parsed = new URL(href);
  if (parsed.origin !== new URL(origin).origin) continue;
  const response = await page.request.get(href);
  linkStatuses.push({ href, status: response.status() });
}
facts.sameOriginLinkStatuses = linkStatuses;
facts.sameOrigin404 = linkStatuses.filter((item) => item.status >= 400);

facts.consoleErrors = consoleErrors;
facts.pageErrors = pageErrors;
facts.failedSameOriginRequests = failedRequests;
facts.sameOriginStatus400 = status400;
facts.fontNetwork = {
  externalGoogleFonts: externalFonts.filter((item) => /fonts\.googleapis\.com/i.test(item)),
  gstatic: externalFonts.filter((item) => /fonts\.gstatic\.com/i.test(item)),
};

for (const name of [
  'home-1440.png',
  'home-320.png',
  'clinical-1440.png',
  'clinical-320.png',
  'socio-1440.png',
  'socio-320.png',
  'observatory-1440.png',
  'observatory-320.png',
  'menu-320.png',
]) {
  facts.screenshotHashes[name] = sha256File(path.join(outDir, name));
}

facts.screenshotComparison = {
  home1440Approved: 'ae8d13f4fffe79c5083ade476442eee02fe3eeaba978f73192e534977b2426b4',
  clinical1440Approved: 'b5ce8d4ee6614b0f59cbf357931fa264b433eea110247c5a64aa09f7343a7911',
  socio1440Approved: 'e1893095280c5281c5d5b011013c587f0969c9a120a138fde094a4c788553fc8',
  observatory1440Prior6d43: 'b1f7db6c57b851f383aeb2b96eeec3be5ac6cde523e7ce7da0c3e3a9d1791745',
  observatory320Prior6d43Top: 'bbac3b522dfe6c7f1b394f77d3087eee553f1c772cdbc5e3c8cf7a0faf42f362',
  home1440Match:
    facts.screenshotHashes['home-1440.png'] ===
    'ae8d13f4fffe79c5083ade476442eee02fe3eeaba978f73192e534977b2426b4',
  clinical1440Match:
    facts.screenshotHashes['clinical-1440.png'] ===
    'b5ce8d4ee6614b0f59cbf357931fa264b433eea110247c5a64aa09f7343a7911',
  socio1440Match:
    facts.screenshotHashes['socio-1440.png'] ===
    'e1893095280c5281c5d5b011013c587f0969c9a120a138fde094a4c788553fc8',
  observatory1440Match:
    facts.screenshotHashes['observatory-1440.png'] ===
    'b1f7db6c57b851f383aeb2b96eeec3be5ac6cde523e7ce7da0c3e3a9d1791745',
  observatory320Match:
    facts.screenshotHashes['observatory-320.png'] ===
    'bbac3b522dfe6c7f1b394f77d3087eee553f1c772cdbc5e3c8cf7a0faf42f362',
};

const diagnostics = { facts, inferences, pendings };
writeFileSync(
  path.join(__dirname, 'diagnostics.json'),
  `${JSON.stringify(diagnostics, null, 2)}\n`,
);
await browser.close();
console.log('6D.4.4 final audit artifacts written to', __dirname);
