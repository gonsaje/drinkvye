type ContactField = "name" | "email" | "message";

const orderedFields = ["name", "email", "message"] as const satisfies ContactField[];
const fieldLabels: Record<ContactField, string> = {
  name: "Name",
  email: "Email",
  message: "Message",
};

function compactValue(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function sendEmail({
  apiKey,
  from,
  to,
  replyTo,
  subject,
  html,
}: {
  apiKey: string;
  from: string;
  to: string[];
  replyTo?: string;
  subject: string;
  html: string;
}) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: replyTo,
      subject,
      html,
    }),
  });

  return response.ok;
}

export async function POST(request: Request) {
  const apiKey =
    process.env.RESEND_CONTACT_API_KEY ??
    process.env.RESEND_WHOLESALE_API_KEY ??
    process.env.RESEND_ORDERS_API_KEY;
  const from = process.env.VYE_ORDER_FROM_EMAIL;
  const contactEmail = process.env.VYE_CONTACT_EMAIL ?? "info@drinkvye.com";

  if (!apiKey || !from) {
    return Response.json(
      { error: "Contact email delivery is not configured." },
      { status: 500 },
    );
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid message." }, { status: 400 });
  }

  if (compactValue(formData.get("company"))) {
    return Response.json({ received: true });
  }

  const name = compactValue(formData.get("name"));
  const email = compactValue(formData.get("email"));
  const message = compactValue(formData.get("message"));

  if (!name || !email || !message) {
    return Response.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const rows = orderedFields
    .map((field) => {
      const value = compactValue(formData.get(field));

      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #b6dd68;color:#245a35;font-weight:700;vertical-align:top;width:150px;">${escapeHtml(fieldLabels[field])}</td>
        <td style="padding:10px;border-bottom:1px solid #b6dd68;white-space:pre-line;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .join("");

  const sent = await sendEmail({
    apiKey,
    from,
    to: [contactEmail],
    replyTo: email,
    subject: `New Contact Message from ${name}`,
    html: `
      <!doctype html>
      <html>
        <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
          <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
            <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
              <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Vye contact form</p>
              <h1 style="margin:0 0 8px;font-size:28px;">New message from ${escapeHtml(name)}</h1>
              <p style="margin:0 0 24px;color:#5d666d;">Reply to ${escapeHtml(email)}</p>
              <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
            </div>
          </div>
        </body>
      </html>`,
  });

  if (!sent) {
    return Response.json(
      { error: "Unable to deliver the contact message." },
      { status: 502 },
    );
  }

  return Response.json({ received: true });
}
