import { describe, expect, it } from 'vitest';
import { loadAnalysisEvidence } from './loadAnalysisEvidence';
import { loadHomeEvidence } from './loadHomeEvidence';

describe('loadAnalysisEvidence', () => {
  it('keeps Home evidence loadable and metrics intact', () => {
    const home = loadHomeEvidence();
    expect(home.homeMetrics).toHaveLength(4);
    expect(home.byMetricId['met-datasus-001'].metric.unit).toBe('AIHs');
    expect(home.byMetricId['met-market-001'].metric.marketClassification).toBe('observed-revenue');
  });

  it('loads clinical and socioeconomic datasets with unique ids', () => {
    const evidence = loadAnalysisEvidence();
    expect(evidence.gsdTypes.length).toBeGreaterThanOrEqual(10);
    expect(evidence.patterns.length).toBe(3);
    expect(evidence.burdenFindings.length).toBeGreaterThan(0);
    expect(evidence.marketSegments.length).toBeGreaterThan(0);
    expect(evidence.claims.some((c) => c.id === 'clm-clinical-010')).toBe(true);
  });

  it('rejects patient wording for DATASUS and TAM classification for observed revenue', () => {
    const evidence = loadAnalysisEvidence();
    const datasus = evidence.metrics.find((m) => m.id === 'met-datasus-001')!;
    expect(datasus.unit).toBe('AIHs');
    expect(datasus.unit.toLowerCase()).not.toContain('paciente');
    const market = evidence.metrics.find((m) => m.id === 'met-market-001')!;
    expect(market.marketClassification).toBe('observed-revenue');
  });
});
