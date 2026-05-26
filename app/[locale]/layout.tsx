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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    ru: "Азиз Сабуров — Full-Stack Разработчик",
    en: "Aziz Saburov — Full-Stack Developer",
    uz: "Aziz Saburov — Full-Stack Dasturchi",
  };
  const descs: Record<string, string> = {
    ru: "Создаю современные сайты, Telegram-ботов и AI-решения. 18 лет, Ташкент.",
    en: "Building modern websites, Telegram bots, and AI solutions. 18 years old, Tashkent.",
    uz: "Zamonaviy saytlar, Telegram botlar va AI yechimlar yarataman. 18 yoshda, Toshkent.",
  };
  return {
    title: titles[locale] ?? titles.ru,
    description: descs[locale] ?? descs.ru,
    alternates: {
      languages: {
        ru: "/ru",
        en: "/en",
        uz: "/uz",
      },
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
