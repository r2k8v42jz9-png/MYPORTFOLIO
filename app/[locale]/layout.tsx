import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { Providers } from "@/components/providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollProgress from "@/components/ui/ScrollProgress";
import PageTransition from "@/components/ui/PageTransition";
import LoadingScreen from "@/components/ui/LoadingScreen";
import type { Metadata } from "next";

type Locale = "ru" | "en" | "uz";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const SITE_URL = "https://saburov.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Азиз Сабуров — Premium Web Developer & AI Solutions",
    en: "Aziz Saburov — Premium Web Developer & AI Solutions",
    uz: "Aziz Saburov — Premium Web Developer & AI Solutions",
  };
  const descs: Record<string, string> = {
    ru: "Премиальные современные сайты, Telegram-боты и AI-решения с элегантным мультиязычным UI/UX. Высококлассная веб-разработка от Азиза Сабурова.",
    en: "Premium modern websites, Telegram bots, and AI solutions with elegant multilingual UI/UX. High-end web development by Aziz Saburov.",
    uz: "Elegant ko'p tilli UI/UX bilan premium zamonaviy saytlar, Telegram botlar va AI yechimlar. Aziz Saburovdan yuqori darajadagi veb-ishlab chiqish.",
  };
  const ogLocale: Record<string, string> = {
    ru: "ru_RU",
    en: "en_US",
    uz: "uz_UZ",
  };

  const title = titles[locale] ?? titles.ru;
  const description = descs[locale] ?? descs.ru;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ru: "/ru",
        en: "/en",
        uz: "/uz",
        "x-default": "/ru",
      },
    },
    openGraph: {
      type: "website",
      siteName: "Aziz Saburov",
      title,
      description,
      url: `${SITE_URL}/${locale}`,
      locale: ogLocale[locale] ?? "ru_RU",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@saburovvs",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <LoadingScreen />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main className="min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </Providers>
    </NextIntlClientProvider>
  );
}
