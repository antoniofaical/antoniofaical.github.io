import type { StartupPublishedSnapshot } from '../../schemas/startups/publishedSnapshot';
import { buildStartupList, type StartupListItem } from './queryStartups';

export type StartupStats = {
  totalOrganizations: number;
  filteredOrganizations: number;
  scope: 'snapshot' | 'filtered';
  byRelation: Record<string, number>;
  byGeography: Record<string, number>;
  byConfidence: Record<string, number>;
};

export function computeStartupStats(
  snapshot: StartupPublishedSnapshot,
  filtered?: StartupListItem[],
): StartupStats {
  const items = filtered ?? buildStartupList(snapshot);
  const scope = filtered ? 'filtered' : 'snapshot';

  const byRelation: Record<string, number> = {};
  const byGeography: Record<string, number> = {};
  const byConfidence: Record<string, number> = {};

  for (const item of items) {
    for (const relation of item.relations) {
      byRelation[relation] = (byRelation[relation] ?? 0) + 1;
    }
    for (const geography of item.geographies) {
      byGeography[geography] = (byGeography[geography] ?? 0) + 1;
    }
    for (const confidence of item.confidences) {
      byConfidence[confidence] = (byConfidence[confidence] ?? 0) + 1;
    }
  }

  return {
    totalOrganizations: snapshot.organizations.length,
    filteredOrganizations: items.length,
    scope,
    byRelation,
    byGeography,
    byConfidence,
  };
}
