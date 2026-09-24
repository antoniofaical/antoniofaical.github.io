import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, vi } from 'vitest';
import { fetchCurrentPublishedSnapshot, parseStartupPublishedSnapshot } from './startupApi';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const validSnapshot = JSON.parse(
  readFileSync(
    path.resolve(__dirname, '../../../tests/fixtures/startups/synthetic-valid-snapshot.json'),
    'utf8',
  ),
) as unknown;

describe('startup observatory API client', () => {
  it('fetches the current endpoint and validates its contract', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(JSON.stringify(validSnapshot), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );

    const snapshot = await fetchCurrentPublishedSnapshot({
      baseUrl: 'https://data.example.test/',
      fetcher,
    });

    expect(fetcher).toHaveBeenCalledWith(
      'https://data.example.test/v1/observatory/current',
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    );
    expect(snapshot.id).toBe('snap-synth-fixture-valid-2026-08-14');
  });

  it('rejects non-success responses', async () => {
    const fetcher = vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 }));
    await expect(fetchCurrentPublishedSnapshot({ fetcher })).rejects.toThrow(/HTTP 503/);
  });

  it('rejects payloads outside the published snapshot schema', async () => {
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ id: 'invalid' }), { status: 200 }));
    await expect(fetchCurrentPublishedSnapshot({ fetcher })).rejects.toThrow();
  });

  it('keeps a pure parser for synthetic fixtures', () => {
    expect(parseStartupPublishedSnapshot(validSnapshot).organizations).toHaveLength(2);
  });
});
