/**
 * Helpers de caminho compatíveis com `base` do Astro/GitHub Pages.
 * Preferir `import.meta.env.BASE_URL` em componentes Astro/React.
 */

/** Base URL do site (sempre termina com `/`). */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/**
 * Une a base do site a um caminho interno.
 * Aceita caminhos com ou sem `/` inicial.
 */
export function withBase(path = ''): string {
  const base = getBaseUrl();
  const cleaned = path.replace(/^\/+/, '');
  if (!cleaned) return base;
  return `${base}${cleaned}`;
}

/** Normaliza âncoras preservando o base path. */
export function withHash(hash: string): string {
  const normalized = hash.startsWith('#') ? hash : `#${hash}`;
  return `${getBaseUrl()}${normalized}`;
}
