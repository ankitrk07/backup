import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Cart, wishlist and account stay crawlable so their noindex tags are visible to search engines.
        disallow: ["/checkout", "/order/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}