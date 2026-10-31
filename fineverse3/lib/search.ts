import type { SearchResult } from "@/types/content";

export interface SearchEntry extends SearchResult {
  /** normalised text the query is matched against */
  haystack: string;
}

export function normalizeQuery(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function createSearchEntry(
  result: SearchResult,
  keywords: readonly string[] = [],
): SearchEntry {
  return {
    ...result,
    haystack: normalizeQuery([result.title, result.subtitle ?? "", ...keywords].join(" ")),
  };
}

const TYPE_BOOST: Record<SearchResult["type"], number> = {
  product: 0.3,
  collection: 0.2,
  page: 0,
};

/** Every word in the query must match. Title matches rank higher. */
export function searchEntries(
  entries: readonly SearchEntry[],
  query: string,
  limit = 8,
): SearchEntry[] {
  const tokens = normalizeQuery(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: Array<{ entry: SearchEntry; score: number; order: number }> = [];

  entries.forEach((entry, order) => {
    if (!tokens.every((token) => entry.haystack.includes(token))) return;
    const title = normalizeQuery(entry.title);
    let score = TYPE_BOOST[entry.type];
    for (const token of tokens) {
      if (title.startsWith(token)) score += 3;
      else if (title.includes(token)) score += 2;
      else score += 1;
    }
    scored.push({ entry, score, order });
  });

  return scored
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .slice(0, limit)
    .map((item) => item.entry);
}

/** Shown when the palette is opened with an empty query. */
export function pickSuggestions(entries: readonly SearchEntry[], limit = 6): SearchEntry[] {
  return entries.filter((entry) => entry.type !== "product").slice(0, limit);
}