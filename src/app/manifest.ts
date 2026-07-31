import type { MetadataRoute } from "next";
import { company } from "@/config/company";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.name,
    description: company.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    icons: [
      {
        src: "/images/logo-oficial.png",
        sizes: "1082x516",
        type: "image/png",
      },
    ],
  };
}
