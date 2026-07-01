import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/my/", "/api/"],
    },
    sitemap: "https://dearpetbox.co.kr/sitemap.xml",
  };
}
