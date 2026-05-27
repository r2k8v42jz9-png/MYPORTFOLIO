"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Scale, Moon, ArrowRight, ChevronRight, ShieldCheck } from "lucide-react";

// useLayoutEffect on the client, useEffect on the server (avoids SSR warning).
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Fixed design width the "website" is authored at, then scaled to fit. */
const DESIGN_W = 1280;
/** Visible crop height (design px) for the card thumbnail. */
const CARD_CROP = 660;

const SERIF = { fontFamily: "var(--font-serif), Georgia, serif" } as const;

/** Real-site palette (legalmasters.uz). */
const C = {
  cream: "#f4f1ec",
  navy: "#16203a",
  red: "#c1102e",
  gray: "#5c6478",
  line: "rgba(22,32,58,0.10)",
};

/**
 * A faithful recreation of the real Capital Legal Masters homepage
 * (legalmasters.uz) — light editorial layout, crimson + navy, serif
 * display type — rendered like a true screenshot inside a browser window.
 * Authored at a fixed width and scaled to fit any container.
 *
 * `variant="card"` crops to the hero with a slow hover pan; `variant="full"`
 * also reveals the "About" section.
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
        <div className="flex items-center gap-3 px-4 py-3 bg-[#1b1f2a] border-b border-black/20">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#febc2e]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex items-center gap-2 text-white/25">
            <ChevronRight className="w-4 h-4 rotate-180" />
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="mx-auto flex items-center gap-2 bg-white/[0.07] rounded-lg h-7 px-4">
            <ShieldCheck className="w-3.5 h-3.5 text-white/40" />
            <span className="text-[13px] text-white/55 tracking-wide">
              legalmasters.uz
            </span>
          </div>
          <div className="w-12" />
        </div>

        {/* ===== Site (About always present so the card hover-pan reveals it) ===== */}
        <LegalMastersSite showAbout />
      </ScaledScreenshot>

      {/* Screen reflection */}
      <div
        className="relative mx-auto h-16 w-[86%] -mt-px overflow-hidden opacity-20 blur-[1.5px]"
        style={{
          maskImage: "linear-gradient(to bottom, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 75%)",
          transform: "scaleY(-1)",
        }}
        aria-hidden
      >
        <div className="bg-gradient-to-b from-[#e8e4dc] to-transparent w-full h-full" />
      </div>

      {/* Single elegant LIVE badge */}
      <div className="absolute -top-3 right-5 z-10 flex items-center gap-1.5 rounded-full bg-[#11141d]/90 backdrop-blur border border-white/10 px-3 py-1.5 shadow-xl shadow-black/30">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        <span className="text-[10px] font-semibold text-white/90 tracking-[0.15em]">
          LIVE
        </span>
      </div>
    </div>
  );
}

/**
 * Renders children at a fixed design width and scales them down to the
 * measured container width so the result looks like a crisp screenshot.
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
  const [scale, setScale] = useState(0.4);
  const [innerH, setInnerH] = useState(0);

  useIsoLayoutEffect(() => {
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
      className="relative w-full overflow-hidden rounded-xl border border-black/30 shadow-2xl bg-[#1b1f2a] ring-1 ring-black/10"
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
              ? "transition-transform duration-[2600ms] ease-in-out group-hover/preview:-translate-y-[34%]"
              : ""
          }
        >
          {children}
        </div>
      </div>

      {isCard && (
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#1b1f2a]/60 to-transparent pointer-events-none" />
      )}
    </div>
  );
}

/** Faithful recreation of the real homepage, authored at DESIGN_W. */
function LegalMastersSite({ showAbout }: { showAbout: boolean }) {
  return (
    <div
      style={{ background: C.cream, color: C.navy }}
      className="relative overflow-hidden"
    >
      {/* Subtle grid + light wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 35%, black, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 35%, black, transparent 80%)",
          opacity: 0.5,
        }}
      />

      {/* ===== Navbar ===== */}
      <header className="relative flex h-[84px] items-center justify-between px-12 border-b border-black/[0.07]">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-3.5">
          <span className="relative flex w-11 h-11 items-center justify-center">
            <span
              className="absolute inset-0 rotate-45 rounded-[4px]"
              style={{ border: `1.5px solid ${C.red}` }}
            />
            <span
              className="relative text-[12px] font-bold tracking-tight"
              style={{ color: C.red }}
            >
              CLM
            </span>
          </span>
          <span className="flex flex-col justify-center">
            <span
              className="text-[14px] font-semibold leading-none tracking-[0.14em]"
              style={{ color: C.navy }}
            >
              CAPITAL LEGAL
            </span>
            <span
              className="mt-[5px] text-[8.5px] font-medium leading-none tracking-[0.5em]"
              style={{ color: `${C.navy}70` }}
            >
              MASTERS
            </span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex items-center gap-7">
          {[
            "ГЛАВНАЯ",
            "О КОМПАНИИ",
            "УСЛУГИ",
            "ТРЕТЕЙСКИЙ СУД",
            "ПРЕИМУЩЕСТВА",
            "КОНТАКТЫ",
          ].map((item, i) => (
            <span
              key={item}
              className="relative flex items-center text-[12px] font-semibold tracking-[0.1em] whitespace-nowrap"
              style={{ color: i === 0 ? C.navy : `${C.navy}99` }}
            >
              {item}
              {i === 0 && (
                <span
                  className="absolute -bottom-[9px] left-1/2 h-[2px] w-3.5 -translate-x-1/2 rounded-full"
                  style={{ background: C.red }}
                />
              )}
            </span>
          ))}
        </nav>

        {/* Right controls — unified 38px height */}
        <div className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-lg border border-black/10">
            <Moon className="w-[18px] h-[18px]" style={{ color: `${C.navy}66` }} />
          </span>
          <span className="flex h-[38px] items-stretch overflow-hidden rounded-lg border border-black/10">
            <span
              className="flex items-center px-3 text-[11px] font-semibold"
              style={{ color: `${C.navy}80` }}
            >
              O&apos;Z
            </span>
            <span
              className="flex items-center px-3 text-[11px] font-bold text-white"
              style={{ background: C.red }}
            >
              РУ
            </span>
          </span>
          <span
            className="flex h-[38px] items-center rounded-lg px-5 text-[11px] font-bold tracking-[0.12em] text-white"
            style={{ background: C.red, boxShadow: `0 10px 26px ${C.red}33` }}
          >
            КОНТАКТЫ
          </span>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="relative px-10 pt-14 pb-12 text-center flex flex-col items-center">
        {/* scales watermark */}
        <Scale
          className="absolute top-32 left-1/2 -translate-x-1/2 w-72 h-72 pointer-events-none"
          style={{ color: C.navy, opacity: 0.04 }}
          strokeWidth={1}
        />

        {/* eyebrow with side lines */}
        <div className="relative flex items-center gap-4 mb-9">
          <span
            className="h-px w-10"
            style={{ background: `${C.red}66` }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.3em]"
            style={{ color: C.red }}
          >
            ЮРИДИЧЕСКАЯ ФИРМА РЕСПУБЛИКИ УЗБЕКИСТАН
          </span>
          <span
            className="h-px w-10"
            style={{ background: `${C.red}66` }}
          />
        </div>

        {/* Big serif title */}
        <h1
          style={SERIF}
          className="relative text-[96px] leading-[0.96] font-bold tracking-tight"
        >
          <span style={{ color: C.navy }}>CAPITAL </span>
          <span style={{ color: C.red }}>LEGAL</span>
          <br />
          <span style={{ color: C.navy }}>MASTERS</span>
        </h1>

        {/* diamond divider */}
        <div
          className="my-10 w-2.5 h-2.5 rotate-45"
          style={{ border: `1.5px solid ${C.red}` }}
        />

        {/* serif subheading */}
        <h2
          style={{ ...SERIF, color: C.navy }}
          className="text-[30px] font-medium mb-6"
        >
          Надёжный правовой партнёр для вашего бизнеса
        </h2>

        {/* body */}
        <p
          className="text-[15px] leading-relaxed max-w-[620px] mb-9"
          style={{ color: C.gray }}
        >
          ООО «CAPITAL LEGAL MASTERS» — профессиональная юридическая фирма,
          специализирующаяся на комплексном юридическом сопровождении
          предпринимательской деятельности в соответствии с законодательством
          Республики Узбекистан.
        </p>

        {/* buttons */}
        <div className="flex items-center gap-4 mb-9">
          <div
            className="flex items-center gap-2 px-7 py-3.5 rounded-md text-[12px] font-bold tracking-[0.12em] text-white shadow-lg"
            style={{ background: C.red, boxShadow: `0 12px 30px ${C.red}33` }}
          >
            УСЛУГИ
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
          <div
            className="px-7 py-3.5 rounded-md text-[12px] font-bold tracking-[0.12em]"
            style={{ border: `1px solid ${C.navy}33`, color: C.navy }}
          >
            СВЯЗАТЬСЯ
          </div>
        </div>

        <div
          className="text-[10px] tracking-[0.3em] mb-10"
          style={{ color: `${C.navy}55` }}
        >
          ООО «CAPITAL LEGAL MASTERS»
        </div>

        {/* scroll hint */}
        <div className="flex flex-col items-center gap-2">
          <span
            className="text-[9px] tracking-[0.35em]"
            style={{ color: `${C.navy}55` }}
          >
            ПРОКРУТИТЬ ВНИЗ
          </span>
          <span
            className="w-px h-8"
            style={{
              background: `linear-gradient(${C.red}, transparent)`,
            }}
          />
        </div>
      </section>

      {/* ===== About section ===== */}
      {showAbout && (
        <section className="relative px-10 py-16 border-t border-black/[0.06] bg-white/40">
          <div className="grid grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-7" style={{ background: C.red }} />
                <span
                  className="text-[11px] font-semibold tracking-[0.3em]"
                  style={{ color: C.red }}
                >
                  О КОМПАНИИ
                </span>
              </div>
              <h2
                style={{ ...SERIF, color: C.navy }}
                className="text-[40px] leading-[1.1] font-bold mb-7"
              >
                Профессиональные
                <br />
                юридические услуги
              </h2>
              <p
                className="text-[13px] leading-relaxed mb-4"
                style={{ color: C.gray }}
              >
                ООО «CAPITAL LEGAL MASTERS» — профессиональная юридическая
                фирма, осуществляющая деятельность в соответствии с
                законодательством Республики Узбекистан. Фирма специализируется
                на комплексном юридическом сопровождении предпринимательской
                деятельности на всех её этапах — от регистрации юридических лиц
                до корпоративного управления.
              </p>
              <p
                className="text-[13px] leading-relaxed"
                style={{ color: C.gray }}
              >
                При компании учреждён постоянно действующий третейский суд,
                позволяющий разрешать коммерческие споры быстро и
                конфиденциально, без обращения в государственные суды.
              </p>
            </div>

            {/* stat cards */}
            <div
              className="rounded-sm"
              style={{ border: `1px solid ${C.line}` }}
            >
              {[
                ["9", "НАПРАВЛЕНИЙ УСЛУГ"],
                ["100%", "ГАРАНТИЯ КОНФИДЕНЦИАЛЬНОСТИ"],
                ["1", "ПОСТОЯННО ДЕЙСТВУЮЩИЙ ТРЕТЕЙСКИЙ СУД"],
              ].map(([num, label], i) => (
                <div
                  key={label}
                  className="flex items-center gap-7 px-8 py-7"
                  style={{
                    borderTop: i > 0 ? `1px solid ${C.line}` : undefined,
                  }}
                >
                  <span
                    style={{ ...SERIF, color: C.navy }}
                    className="text-[44px] font-semibold leading-none w-24 shrink-0"
                  >
                    {num}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-5" style={{ background: C.red }} />
                    <span
                      className="text-[11px] font-medium tracking-[0.16em]"
                      style={{ color: `${C.navy}cc` }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
