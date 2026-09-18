import { expect, type Page } from '@playwright/test';

export async function expectLegacyShell(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('body')).not.toHaveClass(/brand-pilot/);
  await expect(page.locator('.brand__mark')).toBeVisible();
  await expect(page.locator('img.brand__lockup')).toHaveCount(0);
  const headingFont = await page
    .locator('h1')
    .first()
    .evaluate((el) => getComputedStyle(el).fontFamily);
  expect(headingFont).toMatch(/Manrope/i);
  expect(headingFont).not.toMatch(/Work Sans/i);
}
