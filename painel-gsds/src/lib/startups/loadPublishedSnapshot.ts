import currentSelectorJson from '../../data/startups/published/current.json';
import {
  startupCurrentSelectorSchema,
  startupPublishedSnapshotSchema,
  type StartupCurrentSelector,
  type StartupPublishedSnapshot,
} from '../../schemas/startups/publishedSnapshot';

/**
 * Build-time discovery of immutable published snapshots.
 * Only JSON under `published/snapshots/` is eligible — fixtures must never appear here.
 */
const discoveredSnapshotModules = import.meta.glob(
  '../../data/startups/published/snapshots/*.json',
  { eager: true, import: 'default' },
) as Record<string, unknown>;

/**
 * Validate discovered modules and index them by the snapshot `id` field (not filename).
 * Exported for unit tests of registry construction invariants.
 */
export function buildPublishedSnapshotRegistry(
  modules: Record<string, unknown>,
): Record<string, StartupPublishedSnapshot> {
  const registry: Record<string, StartupPublishedSnapshot> = {};

  for (const [modulePath, raw] of Object.entries(modules)) {
    const parsed = startupPublishedSnapshotSchema.parse(raw);
    if (registry[parsed.id]) {
      throw new Error(
        `Duplicate published snapshot id "${parsed.id}" discovered in ${modulePath} (already registered from another published snapshot file)`,
      );
    }
    registry[parsed.id] = parsed;
  }

  return registry;
}

const PUBLISHED_SNAPSHOTS = buildPublishedSnapshotRegistry(discoveredSnapshotModules);

export function listPublishedSnapshotIds(): string[] {
  return Object.keys(PUBLISHED_SNAPSHOTS).sort();
}

export function loadCurrentSelector(): StartupCurrentSelector {
  return startupCurrentSelectorSchema.parse(currentSelectorJson);
}

export function loadPublishedSnapshotById(snapshotId: string): StartupPublishedSnapshot {
  const snapshot = PUBLISHED_SNAPSHOTS[snapshotId];
  if (!snapshot) {
    throw new Error(
      `Published snapshot "${snapshotId}" is not registered. Available: ${listPublishedSnapshotIds().join(', ') || '(none)'}`,
    );
  }
  return snapshot;
}

/** Production loader: resolves `published/current.json` → immutable snapshot body. */
export function loadPublishedSnapshot(): StartupPublishedSnapshot {
  const selector = loadCurrentSelector();
  return loadPublishedSnapshotById(selector.currentSnapshotId);
}

/** Parse helper for tests/fixtures — never used by the production page loader path. */
export function parseStartupPublishedSnapshot(raw: unknown): StartupPublishedSnapshot {
  return startupPublishedSnapshotSchema.parse(raw);
}
