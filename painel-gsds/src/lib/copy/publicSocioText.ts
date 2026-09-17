const VAL_TOT_NOMINAL_NAS_AIHS = /VAL_TOT nominal de (R\$[\d.]+(?:,\d+)?) nas 997 AIHs/g;
const SOMA_DE_VAL_TOT = /Soma de VAL_TOT das AIHs com DIAG_PRINC E74\.0/g;
const E_VAL_TOT_NOMINAL = / e VAL_TOT nominal de (R\$[\d.]+(?:,\d+)?)/g;

function collapseWhitespace(value: string): string {
  return value
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ ]{2,}/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/,\s*\)/g, ')')
    .replace(/\(\s*,/g, '(')
    .replace(/\(\s+/g, '(')
    .replace(/\s+\)/g, ')')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+\./g, '.')
    .replace(/\.\s+\./g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function capitalizeAfterPeriod(value: string): string {
  return value.replace(/([.!?]\s+)([a-zà-ÿ])/g, (_, boundary: string, letter: string) => {
    return `${boundary}${letter.toUpperCase()}`;
  });
}

/** Contextual VAL_TOT deletions. No global semantic replacement. */
export function scrubValTotFrames(value: string): string {
  return value
    .replace(VAL_TOT_NOMINAL_NAS_AIHS, '$1 nas 997 AIHs')
    .replace(SOMA_DE_VAL_TOT, 'AIHs com DIAG_PRINC E74.0')
    .replace(E_VAL_TOT_NOMINAL, ' e $1');
}

export function stripAihPatientEcho(value: string): string {
  return value
    .replace(/AIHs não correspondem a pacientes únicos;\s*/gi, '')
    .replace(
      /AIHs? não equivalem a pacientes(?:, indivíduos ou internações únicas deduplicadas)?[.;]?\s*/gi,
      '',
    )
    .replace(/AIH ≠ paciente;\s*/g, '');
}

export function stripObservedRevenueTamEcho(value: string): string {
  return value
    .replace(/Representa receita realizada, não TAM\/SAM\/SOM\.\s*/gi, '')
    .replace(/Receita realizada, não TAM\/SAM\/SOM\.\s*/gi, '');
}

export function publicSocioText(input: string): string {
  let text = scrubValTotFrames(input);

  text = text.replace(/SoT médica/g, 'síntese médica');
  text = text.replace(/SoT socioeconômica/g, 'síntese socioeconômica');
  text = text.replace(/\bSoT\b/g, 'síntese');
  text = text.replace(/fonte de verdade/gi, 'fonte');

  text = text.replace(/\b(?:CAR|ECO)-\d+\b/g, '');
  text = text.replace(/\s+a\s+(?=[),])/g, '');
  text = collapseWhitespace(text);
  text = capitalizeAfterPeriod(text);
  return text;
}

export function publicSocioSecondaryText(input: string): string {
  return collapseWhitespace(
    capitalizeAfterPeriod(stripObservedRevenueTamEcho(stripAihPatientEcho(publicSocioText(input)))),
  );
}
