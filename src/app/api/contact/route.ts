import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  requestType?: string;
  name?: string;
  company?: string;
  email?: string;
  message?: string;
  website?: string;
};

const MAX_FIELD_LENGTH = 2000;
const MAX_MESSAGE_LENGTH = 8000;

function clean(value: unknown, maximumLength = MAX_FIELD_LENGTH) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maximumLength);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const honeypot = clean(payload.website);
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(payload.name);
  const requestType = clean(payload.requestType);
  const company = clean(payload.company);
  const email = clean(payload.email);
  const message = clean(payload.message, MAX_MESSAGE_LENGTH);

  if (!requestType || !name || !email) {
    return NextResponse.json(
      { error: "Request type, name and email are required." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json(
      { error: "Email delivery is not configured yet." },
      { status: 503 },
    );
  }

  const subject = `${requestType} request from ${name}`;
  const text = [
    "New BrandLabel Agency contact request",
    "",
    `Request: ${requestType}`,
    `Name: ${name}`,
    `Company: ${company || "Not provided"}`,
    `Email: ${email}`,
    "",
    "Message:",
    message || "Not provided",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #0B1F3A; line-height: 1.6;">
      <h2>New BrandLabel Agency contact request</h2>
      <p><strong>Request:</strong> ${escapeHtml(requestType)}</p>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message || "Not provided").replaceAll("\n", "<br />")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      reply_to: email,
    }),
  });

  if (!response.ok) {
    const resendError = await response.text();
    console.error("Resend email failed", response.status, resendError);

    return NextResponse.json(
      { error: "Email could not be sent. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
