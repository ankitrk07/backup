import { Review } from "@/types";
import { MOCK_REVIEWS } from "./mock-db";

const simulateDelay = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  await simulateDelay();
  return MOCK_REVIEWS.filter((r) => r.productId === productId);
}

export async function getAllReviews(): Promise<Review[]> {
  await simulateDelay();
  return [...MOCK_REVIEWS];
}
