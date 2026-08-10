import { describe, expect, it } from 'vitest';
import { loadHomeEvidence } from './loadHomeEvidence';
import { metricSchema } from '../../schemas/metric';
import { claimSchema } from '../../schemas/claim';

describe('loadHomeEvidence', () => {
  const evidence = loadHomeEvidence();

  it('parses sources, claims and metrics with unique ids', () => {
    expect(evidence.sources.length).toBeGreaterThan(0);
    expect(evidence.claims.length).toBeGreaterThan(0);
    expect(evidence.metrics.length).toBe(4);
    expect(new Set(evidence.sources.map((s) => s.id)).size).toBe(evidence.sources.length);
    expect(new Set(evidence.claims.map((c) => c.id)).size).toBe(evidence.claims.length);
    expect(new Set(evidence.metrics.map((m) => m.id)).size).toBe(evidence.metrics.length);
  });

  it('resolves metric → claim → source for every Home metric', () => {
    for (const item of evidence.homeMetrics) {
      expect(item.claim.id).toBe(item.metric.claimId);
      expect(item.claim.approvedForPublication).toBe(true);
      expect(item.sources.map((s) => s.id)).toEqual(item.metric.sourceIds);
      expect(item.claim.sourceRefs.length).toBeGreaterThan(0);
      expect(item.claim.sotRefs.length).toBeGreaterThan(0);
    }
  });

  it('keeps DATASUS metric labeled as AIHs, never patients', () => {
    const datasus = evidence.byMetricId['met-datasus-001'];
    expect(datasus.metric.unit).toBe('AIHs');
    expect(datasus.metric.unit.toLowerCase()).not.toContain('paciente');
    expect(datasus.metric.label.toLowerCase()).not.toContain('paciente');
    expect(datasus.metric.limitations.some((text) => /aih/i.test(text))).toBe(true);
    expect(datasus.metric.evidenceState).toBe('proxy');
  });

  it('classifies Pompe revenue as observed revenue, not TAM/SAM/SOM', () => {
    const market = evidence.byMetricId['met-market-001'];
    expect(market.metric.currency).toBe('EUR');
    expect(market.metric.priceYear).toBe(2024);
    expect(market.metric.marketClassification).toBe('observed-revenue');
    expect(market.metric.limitations.some((text) => /TAM|SAM|SOM/i.test(text))).toBe(true);
  });

  it('rejects not-calculable metrics that carry a numeric value', () => {
    const result = metricSchema.safeParse({
      id: 'met-test-001',
      label: 'Teste',
      value: 10,
      unit: 'x',
      geography: ['x'],
      period: '2024',
      evidenceState: 'not-calculable',
      sourceIds: ['src-sot-medical-exec-2026'],
      claimId: 'clm-clinical-001',
      limitations: ['n/a'],
      lastReviewedAt: '2026-08-10',
    });
    expect(result.success).toBe(false);
  });

  it('rejects unapproved claims for publication gate', () => {
    const draft = claimSchema.parse({
      ...evidence.claims[0],
      id: 'clm-clinical-999',
      approvedForPublication: false,
    });
    expect(draft.approvedForPublication).toBe(false);
  });
});
