#!/usr/bin/env node
/**
 * Validates published startup snapshots selected by current.json.
 * Exit non-zero on invalid data. Empty published base is valid.
 */
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  startupCurrentSelectorSchema,
  startupPublishedSnapshotSchema,
  type StartupPublishedSnapshot,
} from '../src/schemas/startups/publishedSnapshot';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const publishedDir = path.join(root, 'src/data/startups/published');
const snapshotsDir = path.join(publishedDir, 'snapshots');
const fixturesDir = path.join(root, 'tests/fixtures/startups');

function readJson(filePath: string): unknown {
  return JSON.parse(readFileSync(filePath, 'utf8'));
}

function fail(message: string): never {
  console.error(`[data:validate] ${message}`);
  process.exit(1);
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).sort(([a], [b]) =>
      a.localeCompare(b),
    );
    return Object.fromEntries(entries.map(([key, nested]) => [key, canonicalize(nested)]));
  }
  return value;
}

/** SHA-256 of canonical JSON excluding the checksum field itself. */
export function computeSnapshotChecksum(snapshot: StartupPublishedSnapshot): string {
  const { checksum: _ignored, ...body } = snapshot;
  const canon = JSON.stringify(canonicalize(body));
  return createHash('sha256').update(canon, 'utf8').digest('hex');
}

try {
  const selectorRaw = readJson(path.join(publishedDir, 'current.json'));
  const selector = startupCurrentSelectorSchema.parse(selectorRaw);

  const snapshotFiles = readdirSync(snapshotsDir).filter((name) => name.endsWith('.json'));
  const byId = new Map<string, string>();

  for (const fileName of snapshotFiles) {
    const filePath = path.join(snapshotsDir, fileName);
    const raw = readJson(filePath);
    const parsed = startupPublishedSnapshotSchema.parse(raw);
    if (byId.has(parsed.id)) {
      fail(`Duplicate snapshot id ${parsed.id} in ${fileName} and ${byId.get(parsed.id)}`);
    }
    byId.set(parsed.id, fileName);

    if (parsed.checksum !== 'reserved-not-computed') {
      const expected = computeSnapshotChecksum(parsed);
      if (parsed.checksum !== expected) {
        fail(
          `Snapshot ${parsed.id} checksum mismatch: declared ${parsed.checksum}, computed ${expected}`,
        );
      }
      console.log(`[data:validate] OK checksum ${parsed.id}`);
    } else {
      console.log(`[data:validate] OK snapshot ${parsed.id} (checksum placeholder reserved)`);
    }

    console.log(`[data:validate] OK snapshot ${parsed.id} (${fileName})`);
  }

  if (!byId.has(selector.currentSnapshotId)) {
    fail(
      `current.json points to missing snapshot ${selector.currentSnapshotId}. Available: ${[...byId.keys()].join(', ')}`,
    );
  }

  const publishedText = snapshotFiles.join(' ');
  if (/synth|fixture|fake|acme|lorem/i.test(publishedText)) {
    fail('Published snapshot filenames look like fixtures; move synthetics to tests/fixtures/');
  }

  try {
    const fixtureNames = readdirSync(fixturesDir);
    for (const name of fixtureNames) {
      if (!name.endsWith('.json')) continue;
      if (name.includes('invalid')) continue;
      const raw = readJson(path.join(fixturesDir, name));
      startupPublishedSnapshotSchema.parse(raw);
      console.log(`[data:validate] OK fixture ${name}`);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
  }

  console.log(
    `[data:validate] Current selector → ${selector.currentSnapshotId} (${byId.get(selector.currentSnapshotId)})`,
  );
  console.log('[data:validate] All published startup data checks passed.');
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}
