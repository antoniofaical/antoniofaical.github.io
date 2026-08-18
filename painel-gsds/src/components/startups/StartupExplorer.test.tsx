/** @vitest-environment jsdom */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import StartupExplorer from './StartupExplorer';
import { parseStartupPublishedSnapshot } from '../../lib/startups/loadPublishedSnapshot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

afterEach(() => {
  cleanup();
});

describe('StartupExplorer with synthetic fixtures', () => {
  const snapshot = parseStartupPublishedSnapshot(
    JSON.parse(
      readFileSync(
        path.resolve(__dirname, '../../../tests/fixtures/startups/synthetic-valid-snapshot.json'),
        'utf8',
      ),
    ),
  );

  it('supports search, filters, clear and detail drawer', () => {
    render(<StartupExplorer snapshot={snapshot} />);

    expect(screen.getByTestId('startup-summary-count').textContent).toMatch(/2 organizações/i);

    fireEvent.change(screen.getByTestId('startup-search'), {
      target: { value: 'HelixGlyph' },
    });
    expect(screen.getByRole('status').textContent).toMatch(/1 organização/i);

    fireEvent.change(screen.getByTestId('startup-search'), { target: { value: '' } });
    fireEvent.click(screen.getByRole('button', { name: /Mostrar filtros/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /Adjacente às GSDs/i }));
    fireEvent.click(screen.getByRole('checkbox', { name: /^Brasil$/i }));
    expect(screen.getByRole('status').textContent).toMatch(/1 organização/i);

    fireEvent.change(screen.getByTestId('startup-search'), {
      target: { value: 'zzzz-no-match-synth' },
    });
    expect(screen.getByTestId('startup-no-results')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /Limpar busca e filtros/i }));
    expect(screen.getByRole('status').textContent).toMatch(/2 organizações/i);

    fireEvent.click(screen.getAllByRole('button', { name: /Ver detalhe/i })[0]);
    expect(screen.getByTestId('startup-detail')).toBeTruthy();
    fireEvent.keyDown(document, { key: 'Escape' });
  });
});
