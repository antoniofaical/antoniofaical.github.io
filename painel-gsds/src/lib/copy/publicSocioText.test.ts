import { describe, expect, it } from 'vitest';
import { publicSocioSecondaryText, publicSocioText, scrubValTotFrames } from './publicSocioText';

describe('publicSocioText — VAL_TOT three known frames', () => {
  it('removes VAL_TOT nominal de … nas 997 AIHs without replacement label', () => {
    const source =
      'VAL_TOT nominal de R$533.796,75 nas 997 AIHs E74.0 (jan/2020–mai/2026). Mede hospitalização codificada.';
    const display = scrubValTotFrames(source);
    expect(display).toBe(
      'R$533.796,75 nas 997 AIHs E74.0 (jan/2020–mai/2026). Mede hospitalização codificada.',
    );
    expect(display).not.toMatch(/VAL_TOT/);
    expect(display).not.toMatch(/soma aprovada/i);
  });

  it('removes Soma de VAL_TOT frame', () => {
    const source = 'Soma de VAL_TOT das AIHs com DIAG_PRINC E74.0';
    const display = scrubValTotFrames(source);
    expect(display).toBe('AIHs com DIAG_PRINC E74.0');
    expect(display).not.toMatch(/VAL_TOT/);
  });

  it('removes e VAL_TOT nominal de … after hospital deaths', () => {
    const source =
      'com nove registros de óbito hospitalar e VAL_TOT nominal de R$533.796,75. AIHs não correspondem a pacientes únicos.';
    const display = scrubValTotFrames(source);
    expect(display).toBe(
      'com nove registros de óbito hospitalar e R$533.796,75. AIHs não correspondem a pacientes únicos.',
    );
    expect(display).not.toMatch(/VAL_TOT/);
  });

  it('does not invent soma de soma aprovada or soma aprovada nominal', () => {
    const combined = publicSocioText(
      [
        'VAL_TOT nominal de R$533.796,75 nas 997 AIHs E74.0',
        'Soma de VAL_TOT das AIHs com DIAG_PRINC E74.0',
        'e VAL_TOT nominal de R$533.796,75.',
      ].join(' '),
    );
    expect(combined).not.toMatch(/VAL_TOT/);
    expect(combined).not.toMatch(/soma de soma aprovada/i);
    expect(combined).not.toMatch(/soma aprovada nominal/i);
  });
});

describe('publicSocioText — lexical only', () => {
  it('maps SoT terms to approved public labels', () => {
    expect(publicSocioText('citados pela SoT médica')).toBe('citados pela síntese médica');
    expect(publicSocioText('na SoT socioeconômica')).toBe('na síntese socioeconômica');
    expect(publicSocioText('dados públicos da SoT.')).toBe('dados públicos da síntese.');
    expect(publicSocioText('autorizada pela fonte de verdade')).toBe('autorizada pela fonte');
  });

  it('removes CAR/ECO identifiers without breaking remaining prose', () => {
    expect(publicSocioText('GSD I — adultos alemães no estudo citado (CAR-048, CAR-049)')).toBe(
      'GSD I — adultos alemães no estudo citado',
    );
    expect(publicSocioText('estudo europeu (ECO-001, ECO-002)')).toBe('estudo europeu');
  });

  it('leaves text without internal tokens unchanged besides explicit normalization', () => {
    const stable = 'Camadas monetárias não devem ser somadas entre moedas.';
    expect(publicSocioText(stable)).toBe(stable);
  });

  it('strips AIH patient echo from secondary strings', () => {
    const detail = publicSocioSecondaryText(
      'com nove registros de óbito hospitalar e VAL_TOT nominal de R$533.796,75. AIHs não correspondem a pacientes únicos; o CID E74.0 não distingue tipos de GSD.',
    );
    expect(detail).not.toMatch(/pacientes únicos/i);
    expect(detail).toMatch(/CID E74\.0 não distingue tipos/);
    expect(detail).not.toMatch(/VAL_TOT/);
  });
});
