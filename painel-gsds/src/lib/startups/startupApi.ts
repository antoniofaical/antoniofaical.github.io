import {
  startupPublishedSnapshotSchema,
  type StartupPublishedSnapshot,
} from '../../schemas/startups/publishedSnapshot';

export const DEFAULT_GSD_API_BASE_URL = 'https://api.antoniofaical.dev.br';

export function parseStartupPublishedSnapshot(raw: unknown): StartupPublishedSnapshot {
  return startupPublishedSnapshotSchema.parse(raw);
}

export async function fetchCurrentPublishedSnapshot({
  baseUrl = DEFAULT_GSD_API_BASE_URL,
  signal,
  fetcher = fetch,
}: {
  baseUrl?: string;
  signal?: AbortSignal;
  fetcher?: typeof fetch;
} = {}): Promise<StartupPublishedSnapshot> {
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');
  const response = await fetcher(`${normalizedBaseUrl}/v1/observatory/current`, {
    headers: { Accept: 'application/json' },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Observatory API returned HTTP ${response.status}`);
  }

  return parseStartupPublishedSnapshot(await response.json());
}
