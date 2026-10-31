import { useCallback, useSyncExternalStore } from "react"

const STORAGE_KEY = "fineverse-recent-searches"
const MAX_ITEMS = 6

const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function parseStorage(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

// getSnapshot must return a referentially stable value when nothing has
// changed, or useSyncExternalStore loops forever re-reading it. Cache the
// parsed array and only replace the reference on an actual write.
let cachedSnapshot: string[] | null = null

function getSnapshot(): string[] {
  if (cachedSnapshot === null) cachedSnapshot = parseStorage()
  return cachedSnapshot
}

function commit(items: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  cachedSnapshot = items
  listeners.forEach((listener) => listener())
}

const emptySnapshot: string[] = []

export function useRecentSearches() {
  const recent = useSyncExternalStore(subscribe, getSnapshot, () => emptySnapshot)

  const add = useCallback((query: string) => {
    const trimmed = query.trim()
    if (!trimmed) return
    const next = [trimmed, ...getSnapshot().filter((q) => q.toLowerCase() !== trimmed.toLowerCase())].slice(
      0,
      MAX_ITEMS
    )
    commit(next)
  }, [])

  const clear = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    commit([])
  }, [])

  return { recent, add, clear }
}
