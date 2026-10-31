"use client";

import { CornerDownLeft, FileText, Layers, Search, ShoppingBag, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { pickSuggestions, searchEntries, type SearchEntry } from "@/lib/search";
import { cn } from "@/lib/utils";
import { useUiStore } from "@/store/ui-store";

const TYPE_ICON = {
  product: ShoppingBag,
  collection: Layers,
  page: FileText,
} satisfies Record<SearchEntry["type"], typeof Search>;

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  product: "Product",
  collection: "Collection",
  page: "Page",
};

interface PaletteBodyProps {
  entries: SearchEntry[];
  titleId: string;
  onClose: () => void;
}

/** Mounted only while open, so its query state resets every time. */
function PaletteBody({ entries, titleId, onClose }: PaletteBodyProps) {
  const router = useRouter();
  const baseId = useId();
  const listId = `${baseId}-list`;
  const [query, setQuery] = useState("");
  const [rawIndex, setRawIndex] = useState(0);

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed ? searchEntries(entries, trimmed, 8) : pickSuggestions(entries, 7)),
    [entries, trimmed],
  );
  const activeIndex = results.length === 0 ? -1 : Math.min(rawIndex, results.length - 1);

  useEffect(() => {
    if (activeIndex < 0) return;
    document.getElementById(`${baseId}-option-${activeIndex}`)?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, baseId]);

  function openEntry(entry: SearchEntry) {
    onClose();
    router.push(entry.href);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setRawIndex((activeIndex + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setRawIndex((activeIndex - 1 + results.length) % results.length);
    } else if (event.key === "Enter") {
      const entry = results[activeIndex];
      if (entry) {
        event.preventDefault();
        openEntry(entry);
      }
    }
  }

  return (
    <>
      <h2 id={titleId} className="sr-only">
        Search
      </h2>

      <div className="flex shrink-0 items-center gap-2 border-b border-line pl-4 pr-1 focus-within:border-accent">
        <Search className="size-5 shrink-0 text-subtle" aria-hidden="true" />
        <input
          type="text"
          role="combobox"
          aria-label="Search products and collections"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="go"
          placeholder="Search tees, hoodies, drops..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setRawIndex(0);
          }}
          onKeyDown={onKeyDown}
          className="h-14 min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-subtle focus:outline-none"
        />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close search">
          <X className="size-5" aria-hidden="true" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
        <p role="status" className="sr-only">
          {trimmed ? `${results.length} results` : ""}
        </p>

        {results.length === 0 ? (
          <p className="px-3 py-10 text-center text-muted">
            {`No matches for “${trimmed}”. Try “hoodie” or “Sisters Revenge”.`}
          </p>
        ) : (
          <>
            {!trimmed ? (
              <p className="px-3 pb-1 pt-2 font-display text-eyebrow uppercase text-subtle">
                Suggestions
              </p>
            ) : null}
            <ul id={listId} role="listbox" aria-label="Search results">
              {results.map((entry, index) => {
                const Icon = TYPE_ICON[entry.type];
                const active = index === activeIndex;
                return (
                  <li
                    key={entry.id}
                    id={`${baseId}-option-${index}`}
                    role="option"
                    aria-selected={active}
                    onMouseMove={() => setRawIndex(index)}
                    onClick={() => openEntry(entry)}
                    className={cn(
                      "flex min-h-tap cursor-pointer items-center gap-3 rounded px-3 py-2",
                      active ? "bg-raised" : "bg-transparent",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded",
                        active ? "bg-accent text-accent-fg" : "bg-surface text-muted",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base text-fg">{entry.title}</span>
                      {entry.subtitle ? (
                        <span className="block truncate text-sm text-muted">{entry.subtitle}</span>
                      ) : null}
                    </span>
                    <span className="shrink-0 text-xs uppercase tracking-wider text-subtle">
                      {TYPE_LABEL[entry.type]}
                    </span>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="hidden shrink-0 items-center justify-between border-t border-line px-4 py-2.5 text-xs text-subtle sm:flex">
        <span>Up and down to move, Enter to open, Esc to close</span>
        <CornerDownLeft className="size-3.5" aria-hidden="true" />
      </div>
    </>
  );
}

export function CommandPalette({ entries }: { entries: SearchEntry[] }) {
  const open = useUiStore((state) => state.searchOpen);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);
  const titleId = useId();
  const close = useCallback(() => setSearchOpen(false), [setSearchOpen]);

  return (
    <Overlay
      open={open}
      onClose={close}
      labelledBy={titleId}
      placement="top"
      panelClassName="max-w-xl"
    >
      <PaletteBody entries={entries} titleId={titleId} onClose={close} />
    </Overlay>
  );
}