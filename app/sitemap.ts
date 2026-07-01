import type { MetadataRoute } from "next";

const BASE = "https://dearpetbox.co.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/quiz", "/about", "/ingredients", "/faq"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
