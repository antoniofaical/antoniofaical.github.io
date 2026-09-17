import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const tokensPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'tokens.css');
const css = readFileSync(tokensPath, 'utf8');

function parseCustomProperties(source: string): Map<string, string> {
  const props = new Map<string, string>();
  const pattern = /(--[A-Za-z0-9-]+)\s*:\s*([^;]+);/g;
  for (const match of source.matchAll(pattern)) {
    props.set(match[1], match[2].trim().replace(/\s+/g, ' '));
  }
  return props;
}

function normalizeHex(value: string): string {
  const hex = value.trim();
  const match = /^#([0-9a-f]{3,8})$/i.exec(hex);
  if (!match) return hex.toLowerCase();
  return `#${match[1].toLowerCase()}`;
}

const props = parseCustomProperties(css);

describe('6D.2 additive Einstein brand tokens', () => {
  it('defines the Einstein color primitives with 6D.0 hex values', () => {
    const expected: Record<string, string> = {
      '--einstein-blue-dark': '#00539a',
      '--einstein-blue-medium': '#0096d2',
      '--einstein-blue-light': '#00dbff',
      '--einstein-neutral-900': '#212121',
      '--einstein-neutral-700': '#545454',
      '--einstein-neutral-500': '#ababab',
      '--einstein-neutral-400': '#bababa',
      '--einstein-neutral-300': '#d4d4d4',
      '--einstein-neutral-100': '#ededed',
      '--einstein-neutral-50': '#f2f2f2',
      '--einstein-white': '#ffffff',
    };

    for (const [name, hex] of Object.entries(expected)) {
      expect(props.has(name), `${name} must exist`).toBe(true);
      expect(normalizeHex(props.get(name)!)).toBe(hex);
    }
  });

  it('defines future semantic aliases pointing at Einstein primitives', () => {
    expect(props.get('--color-brand-primary')).toBe('var(--einstein-blue-dark)');
    expect(props.get('--color-brand-secondary')).toBe('var(--einstein-blue-medium)');
    expect(props.get('--color-brand-accent')).toBe('var(--einstein-blue-light)');
    expect(props.get('--color-text-primary')).toBe('var(--einstein-neutral-900)');
    expect(props.get('--color-text-secondary')).toBe('var(--einstein-neutral-700)');
    expect(props.get('--color-border-brand')).toBe('var(--einstein-neutral-300)');
    expect(props.get('--color-surface-subtle-brand')).toBe('var(--einstein-neutral-50)');
    expect(props.get('--color-surface-brand')).toBe('var(--einstein-white)');
  });

  it('defines target typography stacks without activating them', () => {
    expect(props.get('--font-heading-brand')).toBe("'Work Sans', 'Montserrat', Arial, sans-serif");
    expect(props.get('--font-interface-brand')).toBe("'Inter', 'Montserrat', Arial, sans-serif");
    expect(props.get('--font-institutional-brand')).toBe("'Montserrat', Arial, sans-serif");
  });

  it('preserves active legacy identity tokens', () => {
    for (const name of [
      '--font-display',
      '--font-body',
      '--teal-500',
      '--ink-950',
      '--paper-50',
      '--surface-executive-bg',
      '--surface-editorial-bg',
      '--focus-ring',
    ]) {
      expect(props.has(name), `${name} must remain`).toBe(true);
    }

    expect(props.get('--font-display')).toContain('Manrope');
    expect(props.get('--font-body')).toContain('Inter');
    expect(normalizeHex(props.get('--teal-500')!)).toBe('#1695a0');
    expect(normalizeHex(props.get('--ink-950')!)).toBe('#071b25');
    expect(normalizeHex(props.get('--paper-50')!)).toBe('#f6f8f7');
    expect(props.get('--surface-executive-bg')).toBe('var(--ink-950)');
    expect(props.get('--surface-editorial-bg')).toBe('var(--paper-50)');
    expect(props.get('--focus-ring')).toBe('var(--teal-500)');
  });
});
