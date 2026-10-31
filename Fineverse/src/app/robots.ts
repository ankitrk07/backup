import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/constants"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account/", "/admin/", "/checkout/", "/api/", "/cart", "/wishlist"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
