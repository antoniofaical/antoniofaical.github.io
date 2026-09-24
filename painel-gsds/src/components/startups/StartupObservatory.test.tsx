/** @vitest-environment jsdom */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseStartupPublishedSnapshot } from '../../lib/startups/startupApi';
import StartupObservatory from './StartupObservatory';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const snapshot = parseStartupPublishedSnapshot(
  JSON.parse(
    readFileSync(
      path.resolve(__dirname, '../../../tests/fixtures/startups/synthetic-valid-snapshot.json'),
      'utf8',
    ),
  ),
);

afterEach(() => {
  cleanup();
});

describe('StartupObservatory runtime boundary', () => {
  it('shows a loading state and renders API data', async () => {
    const loadSnapshot = vi.fn().mockResolvedValue(snapshot);
    render(
      <StartupObservatory apiBaseUrl="https://data.example.test" loadSnapshot={loadSnapshot} />,
    );

    expect(screen.getByRole('status').textContent).toMatch(/Carregando/i);
    expect(await screen.findByTestId('startup-explorer')).toBeTruthy();
    expect(screen.getByTestId('startup-summary-count').textContent).toMatch(/2 organizações/i);
    expect(loadSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ baseUrl: 'https://data.example.test' }),
    );
  });

  it('offers a retry after a failed request', async () => {
    const loadSnapshot = vi
      .fn()
      .mockRejectedValueOnce(new Error('offline'))
      .mockResolvedValueOnce(snapshot);
    render(
      <StartupObservatory apiBaseUrl="https://data.example.test" loadSnapshot={loadSnapshot} />,
    );

    expect(await screen.findByRole('alert')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Tentar novamente/i }));
    expect(await screen.findByTestId('startup-explorer')).toBeTruthy();
    expect(loadSnapshot).toHaveBeenCalledTimes(2);
  });
});
