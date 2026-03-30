import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  subject: z.string().min(1).max(100),
  message: z.string().min(10).max(5000),
  privacy: z.literal(true),
});

const SUBJECT_LABELS: Record<string, string> = {
  allgemein: "Allgemeine Anfrage",
  mitgliedschaft: "Mitgliedschaft",
  sponsoring: "Sponsoring & Partnerschaft",
  training: "Training & Probetraining",
  presse: "Presse & Medien",
  sonstiges: "Sonstiges",
};

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Eingabe", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  const subjectLabel = SUBJECT_LABELS[subject] ?? subject;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json({ error: "Mailversand nicht konfiguriert" }, { status: 503 });
  }

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: "Kontaktformular <noreply@fvpreussen-eberswalde.de>",
      to: process.env.CONTACT_EMAIL ?? "info@fvpreussen-eberswalde.de",
      replyTo: email,
      subject: `[Website] ${subjectLabel} – ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1b5e20; padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 20px;">
              Neue Kontaktanfrage
            </h1>
            <p style="color: #a5d6a7; margin: 4px 0 0; font-size: 14px;">
              FV Preussen Eberswalde – Kontaktformular
            </p>
          </div>
          <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #111827;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">E-Mail:</td>
                <td style="padding: 8px 0; color: #111827;">
                  <a href="mailto:${escapeHtml(email)}" style="color: #2e7d32;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #374151;">Betreff:</td>
                <td style="padding: 8px 0; color: #111827;">${escapeHtml(subjectLabel)}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 16px 0;" />
            <h3 style="color: #374151; font-size: 14px; margin: 0 0 8px;">Nachricht:</h3>
            <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e5e7eb; color: #374151; white-space: pre-wrap; line-height: 1.6;">
              ${escapeHtml(message)}
            </div>
            <p style="color: #9ca3af; font-size: 12px; margin: 16px 0 0;">
              Gesendet am ${new Date().toLocaleString("de-DE")} über das Kontaktformular der Website.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
