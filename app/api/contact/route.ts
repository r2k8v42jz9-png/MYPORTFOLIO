import { NextRequest, NextResponse } from "next/server";

// Run on the Node.js runtime (never the Edge), and never statically cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ContactPayload = {
  name?: string;
  email?: string;
  project_type?: string;
  budget?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Escape user input for Telegram's HTML parse mode. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  // --- Parse body ---
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const projectType = payload.project_type?.trim() ?? "";
  const budget = payload.budget?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  // --- Validation ---
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }
  if (name.length > 100 || email.length > 150 || message.length > 4000) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 }
    );
  }

  // --- Telegram config (server-side only — never exposed to the client) ---
  // Trim to guard against trailing spaces/newlines pasted into env vars,
  // which would otherwise break the API URL or chat_id in production.
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!BOT_TOKEN || !CHAT_ID) {
    console.error("[contact] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set.");
    return NextResponse.json(
      { error: "Messaging is temporarily unavailable. Please email me directly." },
      { status: 500 }
    );
  }

  // --- Build the formatted message ---
  const text = [
    "🚀 <b>New Portfolio Lead</b>",
    "",
    `👤 <b>Name:</b> ${escapeHtml(name)}`,
    `📧 <b>Email:</b> ${escapeHtml(email)}`,
    `💼 <b>Project Type:</b> ${escapeHtml(projectType || "—")}`,
    `💰 <b>Budget:</b> ${escapeHtml(budget || "—")}`,
    "",
    "📝 <b>Message:</b>",
    escapeHtml(message),
  ].join("\n");

  // --- Send via Telegram Bot API ---
  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
      }
    );

    const tgData = (await tgRes.json().catch(() => ({}))) as {
      ok?: boolean;
      description?: string;
    };

    if (!tgRes.ok || !tgData.ok) {
      console.error(
        "[contact] Telegram API error:",
        tgData.description ?? tgRes.statusText
      );
      return NextResponse.json(
        { error: "Failed to send your message. Please try again." },
        { status: 502 }
      );
    }

    // --- Best-effort secondary email notification (does not affect the result) ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "portfolio@saburov.site",
            to: ["saburov.aziz@icloud.com"],
            subject: `New portfolio lead from ${name}`,
            html: `
              <h2>🚀 New Portfolio Lead</h2>
              <p><strong>Name:</strong> ${escapeHtml(name)}</p>
              <p><strong>Email:</strong> ${escapeHtml(email)}</p>
              <p><strong>Project Type:</strong> ${escapeHtml(projectType || "—")}</p>
              <p><strong>Budget:</strong> ${escapeHtml(budget || "—")}</p>
              <p><strong>Message:</strong></p>
              <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("[contact] Resend (non-blocking) failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
