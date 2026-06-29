import { cleanEmailEnv } from "@/lib/emailEnv";

export type ResendAttachment = {
  content: string;
  filename: string;
};

type ResendEmail = {
  attachments?: ResendAttachment[];
  html: string;
  idempotencyKey?: string;
  replyTo: string;
  subject: string;
  tags?: {
    name: string;
    value: string;
  }[];
  text?: string;
  to: string[];
};

export const INFO_INBOX = "info@drinkvye.com";
export const ORDERS_INBOX = "orders@drinkvye.com";

function getApiKey() {
  return (
    process.env.RESEND_API_KEY ??
    process.env.RESEND_ORDERS_API_KEY ??
    process.env.RESEND_WHOLESALE_API_KEY
  );
}

export function getInfoFromEmail() {
  return cleanEmailEnv(process.env.VYE_INFO_FROM_EMAIL) ?? "Vye <info@drinkvye.co>";
}

export function getOrdersFromEmail() {
  return (
    cleanEmailEnv(process.env.VYE_ORDER_FROM_EMAIL) ??
    "Vye Orders <orders@drinkvye.co>"
  );
}

export async function sendResendEmail({
  attachments,
  from,
  html,
  idempotencyKey,
  replyTo,
  subject,
  tags,
  text,
  to,
}: ResendEmail & { from: string }) {
  const apiKey = getApiKey();

  if (!apiKey || !from) {
    throw new Error("Resend email is missing RESEND_API_KEY or from address.");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      attachments,
      from,
      html,
      reply_to: replyTo,
      subject,
      tags,
      text,
      to,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email failed (${response.status}): ${body}`);
  }
}
