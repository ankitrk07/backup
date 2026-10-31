import { useSyncExternalStore } from "react";

/*
 * One shared 1-second ticker for the whole app. The server snapshot is 0 so
 * hydration always uses the `fallback` value (passed down from the server),
 * which guarantees there is no hydration mismatch.
 */
let currentNow = 0;
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function tick() {
  currentNow = Date.now();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (listeners.size === 1) {
    currentNow = Date.now();
    timer = setInterval(tick, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => currentNow;
const getServerSnapshot = () => 0;

/** @param fallback a timestamp (ms) computed on the server and passed as a prop */
export function useNow(fallback: number): number {
  const clientNow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return clientNow === 0 ? fallback : clientNow;
}