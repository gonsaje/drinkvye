import {
  getInfoFromEmail,
  INFO_INBOX,
  sendResendEmail,
} from "@/lib/resendEmail";

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

export async function POST(request: Request) {
  const from = getInfoFromEmail();

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

  try {
    await sendResendEmail({
      from,
      to: [INFO_INBOX],
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `New contact message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!doctype html>
        <html>
          <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
            <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
              <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
                <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Vye contact form</p>
                <h1 style="margin:0 0 8px;font-size:28px;">New message from ${escapeHtml(name)}</h1>
                <p style="margin:0 0 24px;color:#5d666d;">Customer email: ${escapeHtml(email)}</p>
                <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
              </div>
            </div>
          </body>
        </html>`,
    });

    await sendResendEmail({
      from,
      to: [email],
      replyTo: INFO_INBOX,
      subject: "We received your Vye message",
      text: `Hi ${name},\n\nWe received your message and will get back to you soon.\n\nVye\n${INFO_INBOX}`,
      html: `
        <!doctype html>
        <html>
          <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
            <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
              <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
                <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Vye</p>
                <h1 style="margin:0 0 16px;font-size:28px;">Thanks for reaching out, ${escapeHtml(name)}.</h1>
                <p style="margin:0;color:#5d666d;font-size:16px;line-height:1.7;">We received your message and will get back to you soon.</p>
                <p style="margin:16px 0 0;color:#5d666d;font-size:16px;line-height:1.7;">
                  For any questions, contact
                  <a href="mailto:${INFO_INBOX}" style="color:#245a35;font-weight:700;text-decoration:none;">${INFO_INBOX}</a>.
                </p>
              </div>
            </div>
          </body>
        </html>`,
    });
  } catch (error) {
    console.error("Resend contact email failed", error);

    return Response.json(
      { error: "Unable to deliver the contact message." },
      { status: 502 },
    );
  }

  return Response.json({ received: true });
}
