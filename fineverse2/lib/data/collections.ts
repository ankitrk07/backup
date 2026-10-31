import { Collection } from "@/types";
import { MOCK_COLLECTIONS } from "./mock-db";

const simulateDelay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCollections(): Promise<Collection[]> {
  await simulateDelay();
  return [...MOCK_COLLECTIONS];
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  await simulateDelay();
  const collection = MOCK_COLLECTIONS.find((c) => c.slug === slug || c.id === slug);
  return collection || null;
}
