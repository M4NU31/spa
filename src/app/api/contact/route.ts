import { NextRequest, NextResponse } from "next/server";

const SUBJECT_LABELS: Record<string, string> = {
  bug: "Bug Report",
  player: "Player Report",
  ban: "Ban Appeal",
  contact: "General Contact",
};

export async function POST(req: NextRequest) {
  const { characterName, subject, message } = await req.json();

  if (!characterName || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;

  const payload = {
    embeds: [
      {
        title: `📬 New Contact Form: ${subjectLabel}`,
        color: 0x00d4ff,
        fields: [
          { name: "Character Name", value: characterName, inline: true },
          { name: "Subject", value: subjectLabel, inline: true },
          { name: "Message", value: message },
        ],
        footer: { text: "Sephirot Ark · Contact Form" },
        timestamp: new Date().toISOString(),
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Webhook delivery failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
