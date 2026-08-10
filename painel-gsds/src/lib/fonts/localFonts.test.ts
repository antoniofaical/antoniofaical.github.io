import { existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const fontsDir = path.join(root, 'public', 'fonts');

const REQUIRED_FONTS = [
  'inter-variable.woff2',
  'inter-italic-variable.woff2',
  'manrope-variable.woff2',
] as const;

describe('local fonts', () => {
  it('ships the three variable WOFF2 files in public/fonts', () => {
    for (const file of REQUIRED_FONTS) {
      const fullPath = path.join(fontsDir, file);
      expect(existsSync(fullPath), `${file} must exist`).toBe(true);
      expect(statSync(fullPath).size).toBeGreaterThan(10_000);
    }
  });

  it('ships OFL license files alongside fonts', () => {
    expect(existsSync(path.join(fontsDir, 'licenses', 'Inter-OFL.txt'))).toBe(true);
    expect(existsSync(path.join(fontsDir, 'licenses', 'Manrope-OFL.txt'))).toBe(true);
  });
});
