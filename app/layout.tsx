import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

// Editorial serif used inside the LegalMasters case-study screenshot.
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://saburov.site";
const SITE_TITLE = "Aziz Saburov — Premium Web Developer & AI Solutions";
const SITE_DESCRIPTION =
  "Premium modern websites, Telegram bots, and AI solutions with elegant multilingual UI/UX. High-end, performance-focused web development by Aziz Saburov.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Aziz Saburov",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Aziz Saburov",
  keywords: [
    "Aziz Saburov",
    "Азиз Сабуров",
    "web developer",
    "premium web development",
    "Next.js developer",
    "Telegram bot development",
    "AI solutions",
    "AI agents",
    "UI/UX design",
    "multilingual websites",
    "Tashkent developer",
    "Uzbekistan",
  ],
  authors: [{ name: "Aziz Saburov", url: SITE_URL }],
  creator: "Aziz Saburov",
  publisher: "Aziz Saburov",
  alternates: {
    canonical: "/",
    languages: {
      ru: "/ru",
      en: "/en",
      uz: "/uz",
      "x-default": "/ru",
    },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    alternateLocale: ["en_US", "uz_UZ"],
    url: SITE_URL,
    siteName: "Aziz Saburov",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      { url: "/opengraph-image", width: 1200, height: 630, alt: SITE_TITLE },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    creator: "@saburovvs",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    { media: "(prefers-color-scheme: light)", color: "#f4f4f4" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Aziz Saburov",
    alternateName: "Азиз Сабуров",
    jobTitle: "Premium Web Developer & AI Specialist",
    description: SITE_DESCRIPTION,
    email: "saburov.aziz@icloud.com",
    telephone: "+998906863432",
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tashkent",
      addressCountry: "UZ",
    },
    sameAs: ["https://t.me/saburovvs"],
    knowsAbout: [
      "Next.js",
      "React",
      "TypeScript",
      "Telegram Bots",
      "AI Integration",
    ],
  };

  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
