import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://azizsaburov.dev"),
  title: {
    default: "Aziz Saburov — Full-Stack Developer",
    template: "%s | Aziz Saburov",
  },
  description:
    "Full-Stack Developer specializing in modern websites, Telegram bots, and AI solutions. Based in Tashkent, Uzbekistan.",
  keywords: ["developer", "full-stack", "next.js", "telegram bot", "ai", "website"],
  authors: [{ name: "Aziz Saburov" }],
  creator: "Aziz Saburov",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://azizsaburov.dev",
    siteName: "Aziz Saburov",
    title: "Aziz Saburov — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in modern websites, Telegram bots, and AI solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aziz Saburov — Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in modern websites, Telegram bots, and AI solutions.",
  },
  robots: { index: true, follow: true },
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
    jobTitle: "Full-Stack Developer",
    description:
      "Full-Stack Developer specializing in modern websites, Telegram bots, and AI solutions.",
    email: "saburov.aziz@icloud.com",
    telephone: "+998906863432",
    url: "https://azizsaburov.dev",
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
    <html lang="ru" suppressHydrationWarning className={inter.variable}>
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
