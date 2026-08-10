import { describe, expect, it, vi } from 'vitest';
import { getBaseUrl, withBase, withHash } from './withBase';

describe('withBase', () => {
  it('une caminho relativo à base raiz', () => {
    vi.stubEnv('BASE_URL', '/');
    expect(getBaseUrl()).toBe('/');
    expect(withBase('design-system/')).toBe('/design-system/');
    expect(withBase('/design-system/')).toBe('/design-system/');
  });

  it('respeita base de projeto GitHub Pages', () => {
    vi.stubEnv('BASE_URL', '/painel-gsds/');
    expect(getBaseUrl()).toBe('/painel-gsds/');
    expect(withBase('design-system/')).toBe('/painel-gsds/design-system/');
    expect(withBase('/')).toBe('/painel-gsds/');
  });

  it('monta âncoras com base', () => {
    vi.stubEnv('BASE_URL', '/painel-gsds/');
    expect(withHash('tokens')).toBe('/painel-gsds/#tokens');
    expect(withHash('#tokens')).toBe('/painel-gsds/#tokens');
  });
});
