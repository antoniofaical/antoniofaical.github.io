import { describe, expect, it } from 'vitest';
import { EVIDENCE_LABELS, EVIDENCE_STATES } from './states';

describe('evidence states', () => {
  it('cobre todos os estados do Design System v0.2', () => {
    expect([...EVIDENCE_STATES]).toEqual([
      'observed',
      'estimated',
      'proxy',
      'conceptual',
      'not-calculable',
      'limited',
    ]);
  });

  it('possui rótulo textual para cada estado', () => {
    for (const state of EVIDENCE_STATES) {
      expect(EVIDENCE_LABELS[state].length).toBeGreaterThan(0);
    }
  });
});
