"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Scale,
  Phone,
  ChevronRight,
  Building2,
  Home,
  Landmark,
  ShieldCheck,
  Star,
} from "lucide-react";

/** Fixed design width the "website" is authored at, then scaled to fit. */
const DESIGN_W = 920;
/** Visible crop height (design px) for the card thumbnail. */
const CARD_CROP = 480;

/**
 * A realistic recreation of the Capital Legal Masters homepage, rendered
 * like a true screenshot: authored at a fixed width and scaled to fit any
 * container. Real navigation, hero copy, trust strip, and practice-area
 * cards — no skeleton placeholders.
 *
 * `variant="card"` crops to the top with a slow hover pan that reveals the
 * lower sections; `variant="full"` shows the entire homepage.
 */
export default function LegalMastersPreview({
  variant = "full",
}: {
  variant?: "card" | "full";
}) {
  const isCard = variant === "card";

  return (
    <div className="relative w-full group/preview">
      <ScaledScreenshot isCard={isCard}>
        {/* ===== Browser chrome ===== */}
        <div className="flex items-center gap-2.5 px-4 py-3 bg-[#0f1422] border-b border-white/[0.06]">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-2 text-white/30">
            <ChevronRight className="w-4 h-4 rotate-180" />
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="ml-1 flex-1 max-w-[340px] bg-white/[0.06] rounded-lg h-7 flex items-center px-3 gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400/70" />
            <span className="text-[12px] text-white/55 tracking-wide">
              legalmasters.uz
            </span>
          </div>
        </div>

        {/* ===== Site ===== */}
        <LegalMastersSite />
      </ScaledScreenshot>

      {/* Screen reflection */}
      <div
        className="relative mx-auto h-14 w-[88%] -mt-px rounded-b-2xl overflow-hidden opacity-25 blur-[1px]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 80%)",
          transform: "scaleY(-1)",
        }}
        aria-hidden
      >
        <div className="bg-gradient-to-b from-[#141b2e] to-transparent w-full h-full" />
      </div>

      {/* Live status badge */}
      <div className="absolute -top-3 right-4 z-10 flex items-center gap-1.5 glass border border-green-500/30 rounded-full px-2.5 py-1 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
        </span>
        <span className="text-[10px] font-bold text-green-400 tracking-wide">
          LIVE
        </span>
      </div>
    </div>
  );
}

/**
 * Renders children at a fixed design width and scales them down to the
 * measured container width so the result looks like a crisp screenshot at
 * any size. Crops + slow-pans for the card variant.
 */
function ScaledScreenshot({
  children,
  isCard,
}: {
  children: ReactNode;
  isCard: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [innerH, setInnerH] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const w = outerRef.current?.clientWidth ?? DESIGN_W;
      setScale(w / DESIGN_W);
      setInnerH(innerRef.current?.offsetHeight ?? 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  const cropDesignH = isCard ? Math.min(innerH || CARD_CROP, CARD_CROP) : innerH;
  const boxHeight = cropDesignH * scale;

  return (
    <div
      ref={outerRef}
      className="relative w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0a0e1a]"
      style={{ height: boxHeight || undefined }}
    >
      <div
        style={{
          width: DESIGN_W,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          ref={innerRef}
          className={
            isCard
              ? "transition-transform duration-[2400ms] ease-in-out group-hover/preview:-translate-y-[38%]"
              : ""
          }
        >
          {children}
        </div>
      </div>

      {isCard && (
        <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#0a0e1a] to-transparent pointer-events-none" />
      )}
    </div>
  );
}

/** The actual realistic homepage markup, authored at DESIGN_W. */
function LegalMastersSite() {
  return (
    <div className="bg-[#0a0e1a] text-white relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#c9a86a]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-52 -left-24 w-96 h-96 rounded-full bg-[#1e3a5f]/20 blur-3xl pointer-events-none" />

      {/* ===== Top navigation ===== */}
      <header className="relative flex items-center justify-between px-9 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#d9bd82] to-[#a07f43] flex items-center justify-center shadow-lg">
            <Scale className="w-5 h-5 text-[#0a0e1a]" />
          </div>
          <div className="leading-none">
            <div className="text-[15px] font-bold tracking-[0.1em] text-white">
              CAPITAL LEGAL MASTERS
            </div>
            <div className="text-[9px] text-[#c9a86a] tracking-[0.3em] mt-1">
              ЮРИДИЧЕСКАЯ ФИРМА
            </div>
          </div>
        </div>
        <nav className="flex items-center gap-7">
          {["Услуги", "Практика", "О компании", "Команда", "Контакты"].map(
            (item, i) => (
              <span
                key={item}
                className={`text-[13px] font-medium ${
                  i === 0 ? "text-white" : "text-white/55"
                }`}
              >
                {item}
              </span>
            )
          )}
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-[11px] text-white/40 tracking-wider">
            RU · UZ · EN
          </span>
          <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#d9bd82] to-[#a07f43] shadow-md">
            <Phone className="w-3 h-3 text-[#0a0e1a]" />
            <span className="text-[12px] font-bold text-[#0a0e1a]">
              Консультация
            </span>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative px-9 pt-14 pb-12 grid grid-cols-5 gap-8 items-center">
        <div className="col-span-3 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#c9a86a]/30 bg-[#c9a86a]/5">
            <Star className="w-3 h-3 text-[#c9a86a] fill-[#c9a86a]" />
            <span className="text-[11px] text-[#c9a86a] font-medium tracking-wide">
              Ведущая юридическая фирма Узбекистана
            </span>
          </div>
          <h1 className="text-[44px] leading-[1.08] font-bold tracking-tight">
            Юридическая защита
            <br />
            <span className="bg-gradient-to-r from-[#e6cd95] via-[#d9bd82] to-[#a07f43] bg-clip-text text-transparent">
              вашего бизнеса
            </span>
          </h1>
          <p className="text-[14px] leading-relaxed text-white/55 max-w-[430px]">
            Более 15 лет защищаем интересы клиентов в корпоративном праве,
            сделках с недвижимостью и налоговых спорах. Индивидуальный подход к
            каждому делу.
          </p>
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d9bd82] to-[#a07f43] shadow-lg shadow-[#c9a86a]/20">
              <span className="text-[14px] font-bold text-[#0a0e1a]">
                Бесплатная консультация
              </span>
              <ChevronRight className="w-4 h-4 text-[#0a0e1a]" />
            </div>
            <div className="px-6 py-3.5 rounded-xl border border-white/15">
              <span className="text-[14px] font-medium text-white/80">
                Наши услуги
              </span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="col-span-2 relative">
          <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[#162236] to-[#0d1322] border border-white/10 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
            {/* "photo" of courthouse columns */}
            <div className="absolute inset-0 flex items-end justify-center gap-2.5 px-8 pb-20 opacity-30">
              {[14, 20, 26, 20, 14].map((h, i) => (
                <div
                  key={i}
                  className="w-3.5 rounded-t bg-gradient-to-t from-[#c9a86a]/40 to-[#c9a86a]/10"
                  style={{ height: `${h * 5}px` }}
                />
              ))}
            </div>
            <Landmark className="absolute top-7 left-1/2 -translate-x-1/2 w-11 h-11 text-[#c9a86a]/50" />
            {/* Floating credential card */}
            <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/[0.07] backdrop-blur-sm border border-white/10 px-4 py-3">
              <div className="text-[19px] font-bold text-[#c9a86a]">ТОП-3</div>
              <div className="text-[10px] text-white/60 leading-tight mt-0.5">
                юридическая фирма по версии Legal&nbsp;500
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust / stats strip ===== */}
      <section className="relative grid grid-cols-4 border-y border-white/[0.06] bg-white/[0.02]">
        {[
          ["500+", "выигранных дел"],
          ["15", "лет на рынке"],
          ["98%", "успешных решений"],
          ["24/7", "поддержка клиентов"],
        ].map(([num, label], i) => (
          <div
            key={label}
            className={`px-6 py-6 text-center ${
              i < 3 ? "border-r border-white/[0.06]" : ""
            }`}
          >
            <div className="text-[28px] font-bold bg-gradient-to-r from-[#e6cd95] to-[#a07f43] bg-clip-text text-transparent">
              {num}
            </div>
            <div className="text-[11px] text-white/45 tracking-wide mt-1">
              {label}
            </div>
          </div>
        ))}
      </section>

      {/* ===== Practice areas ===== */}
      <section className="relative px-9 py-12">
        <div className="text-center mb-9">
          <div className="text-[11px] text-[#c9a86a] tracking-[0.3em] uppercase mb-2">
            Области практики
          </div>
          <h2 className="text-[28px] font-bold tracking-tight">
            Комплексные юридические услуги
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {[
            {
              icon: Building2,
              title: "Корпоративное право",
              desc: "Сопровождение бизнеса, сделки M&A, договорная работа и комплаенс.",
            },
            {
              icon: Home,
              title: "Недвижимость",
              desc: "Сделки, due diligence, разрешение споров и регистрация прав.",
            },
            {
              icon: Landmark,
              title: "Налоговое право",
              desc: "Налоговое планирование и защита в спорах с государственными органами.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-6 hover:border-[#c9a86a]/30 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-[#c9a86a]/12 border border-[#c9a86a]/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#c9a86a]" />
              </div>
              <div className="text-[16px] font-semibold mb-2">{title}</div>
              <p className="text-[12px] leading-relaxed text-white/45">{desc}</p>
              <div className="flex items-center gap-1.5 mt-4 text-[#c9a86a]">
                <span className="text-[11px] font-medium">Подробнее</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="relative px-9 pb-14">
        <div className="rounded-2xl bg-gradient-to-r from-[#162236] to-[#0f1626] border border-[#c9a86a]/15 px-9 py-7 flex items-center justify-between overflow-hidden">
          <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-[#c9a86a]/10 blur-2xl" />
          <div className="relative">
            <div className="text-[19px] font-bold">Нужна юридическая помощь?</div>
            <div className="text-[12px] text-white/50 mt-1">
              Запишитесь на бесплатную консультацию сегодня
            </div>
          </div>
          <div className="relative flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d9bd82] to-[#a07f43] shadow-lg">
            <Phone className="w-4 h-4 text-[#0a0e1a]" />
            <span className="text-[14px] font-bold text-[#0a0e1a]">
              +998 (71) 200-00-00
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
