/**
 * Shared BASE_PATH normalization for Playwright dual-root / subpath runs.
 * Always returns a path with leading and trailing `/`.
 */
export function normalizeBasePath(raw: string | undefined): string {
  let value = (raw ?? '/').trim();
  if (!value) value = '/';
  if (!value.startsWith('/')) value = `/${value}`;
  if (!value.endsWith('/')) value = `${value}/`;
  return value;
}

export const appBasePath = normalizeBasePath(process.env.BASE_PATH);
