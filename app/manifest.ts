import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aziz Saburov — Premium Web Developer & AI Solutions",
    short_name: "Aziz Saburov",
    description:
      "Premium modern websites, Telegram bots, and AI solutions with elegant multilingual UI/UX.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
