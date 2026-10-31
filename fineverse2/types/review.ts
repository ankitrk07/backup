export interface Review {
  id: string;
  productId: string;
  authorName: string;
  authorCity: string;
  verifiedPurchase: boolean;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  sizePurchased: string;
  fitFeedback: "Runs Small" | "True to Size" | "Perfect Oversized" | "Runs Large";
  avatarSlotKey?: string;
  isMockData: true; // Explicit flag so placeholders are never mistaken for real reviews
}
