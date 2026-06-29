import {
  getInfoFromEmail,
  INFO_INBOX,
  sendResendEmail,
  type ResendAttachment,
} from "@/lib/resendEmail";

export const runtime = "nodejs";

type WholesaleField =
  | "businessName"
  | "contactName"
  | "email"
  | "phone"
  | "businessAddress"
  | "website"
  | "locations"
  | "estimatedVolume"
  | "message";

const requiredFields = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "businessAddress",
] as const satisfies WholesaleField[];
const orderedFields = [
  "businessName",
  "contactName",
  "email",
  "phone",
  "businessAddress",
  "website",
  "locations",
  "estimatedVolume",
  "message",
] as const satisfies WholesaleField[];
const fieldLabels: Record<WholesaleField, string> = {
  businessName: "Business Name",
  contactName: "Contact Name",
  email: "Email Address",
  phone: "Phone Number",
  businessAddress: "Business Address",
  website: "Website",
  locations: "Number of Locations",
  estimatedVolume: "Estimated Monthly Order Volume",
  message: "Message / Additional Information",
};
const maxFileSizeBytes = 10 * 1024 * 1024;
const allowedFileTypes = new Set(["application/pdf", "image/jpeg", "image/png"]);
const allowedFileExtensions = new Set(["pdf", "jpg", "jpeg", "png"]);

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

function isValidUsPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalNumber =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  return nationalNumber.length === 10;
}

function getFileExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function validateUpload(file: File | null, label: string, required: boolean) {
  if (!file || file.size === 0) {
    return required ? `${label} is required.` : "";
  }

  if (
    !allowedFileTypes.has(file.type) ||
    !allowedFileExtensions.has(getFileExtension(file.name))
  ) {
    return `${label} must be a PDF, JPG, or PNG file.`;
  }

  if (file.size > maxFileSizeBytes) {
    return `${label} must be 10MB or smaller.`;
  }

  return "";
}

async function createAttachment(file: File | null) {
  if (!file || file.size === 0) return null;

  const buffer = Buffer.from(await file.arrayBuffer());

  return {
    filename: file.name,
    content: buffer.toString("base64"),
  } satisfies ResendAttachment;
}

export async function POST(request: Request) {
  const from = getInfoFromEmail();

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid application." }, { status: 400 });
  }

  if (compactValue(formData.get("company"))) {
    return Response.json({ received: true });
  }

  const missingField = requiredFields.find(
    (field) => !compactValue(formData.get(field)),
  );

  if (missingField) {
    return Response.json(
      { error: `${fieldLabels[missingField]} is required.` },
      { status: 400 },
    );
  }

  const email = compactValue(formData.get("email"));

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  if (!isValidUsPhoneNumber(compactValue(formData.get("phone")))) {
    return Response.json(
      { error: "Please enter a valid 10-digit U.S. phone number." },
      { status: 400 },
    );
  }

  const website = compactValue(formData.get("website"));

  if (website) {
    try {
      new URL(website);
    } catch {
      return Response.json(
        { error: "Please enter a valid website URL." },
        { status: 400 },
      );
    }
  }

  const resaleCertificateEntry = formData.get("resaleCertificate");
  const businessLicenseEntry = formData.get("businessLicense");
  const resaleCertificate =
    resaleCertificateEntry instanceof File ? resaleCertificateEntry : null;
  const businessLicense =
    businessLicenseEntry instanceof File ? businessLicenseEntry : null;
  const resaleCertificateError = validateUpload(
    resaleCertificate,
    "Resale Certificate",
    true,
  );
  const businessLicenseError = validateUpload(
    businessLicense,
    "Business License",
    false,
  );

  if (resaleCertificateError || businessLicenseError) {
    return Response.json(
      { error: resaleCertificateError || businessLicenseError },
      { status: 400 },
    );
  }

  const rows = orderedFields
    .map((field) => {
      const value = compactValue(formData.get(field));

      if (!value) return "";

      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #b6dd68;color:#245a35;font-weight:700;vertical-align:top;">${escapeHtml(fieldLabels[field])}</td>
        <td style="padding:10px;border-bottom:1px solid #b6dd68;white-space:pre-line;">${escapeHtml(value)}</td>
      </tr>`;
    })
    .filter(Boolean)
    .join("");
  const uploadedFiles = [resaleCertificate, businessLicense]
    .filter((file): file is File => Boolean(file && file.size > 0))
    .map((file) => escapeHtml(file.name))
    .join(", ");
  const businessName = compactValue(formData.get("businessName"));
  const contactName = compactValue(formData.get("contactName"));
  const attachments = (
    await Promise.all([
      createAttachment(resaleCertificate),
      createAttachment(businessLicense),
    ])
  ).filter((attachment): attachment is ResendAttachment =>
    Boolean(attachment),
  );

  try {
    await sendResendEmail({
      from,
      to: [INFO_INBOX],
      replyTo: email,
      subject: `New Wholesale Application: ${businessName}`,
      attachments,
      text: `New wholesale application\n\nBusiness: ${businessName}\nContact: ${contactName}\nEmail: ${email}\n\nAttached files: ${uploadedFiles || "None"}`,
      html: `
        <!doctype html>
        <html>
          <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
            <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
              <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
                <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Wholesale application</p>
                <h1 style="margin:0 0 8px;font-size:28px;">${escapeHtml(businessName)}</h1>
                <p style="margin:0 0 24px;color:#5d666d;">Submitted by ${escapeHtml(contactName)} at ${escapeHtml(email)}</p>
                <table style="width:100%;border-collapse:collapse;font-size:15px;">${rows}</table>
                <div style="margin-top:24px;padding:16px;background:#fff8ed;border:1px solid #b6dd68;border-radius:16px;color:#5d666d;font-size:14px;">
                  <strong style="color:#245a35;">Attached files:</strong> ${uploadedFiles || "None"}
                </div>
              </div>
            </div>
          </body>
        </html>`,
    });

    await sendResendEmail({
      from,
      to: [email],
      replyTo: INFO_INBOX,
      subject: "Thank you for applying to become a Vye wholesale partner",
      text: `Hi ${contactName},\n\nWe received your wholesale application for ${businessName}. Our team will review your information and follow up by email.\n\nVye\n${INFO_INBOX}`,
      html: `
        <!doctype html>
        <html>
          <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
            <div style="max-width:640px;margin:0 auto;padding:32px 20px;">
              <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
                <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">Vye wholesale</p>
                <h1 style="margin:0 0 16px;font-size:28px;">Thanks for applying, ${escapeHtml(contactName)}.</h1>
                <div style="margin:0 0 18px;padding:18px;background:#fff8ed;border:1px solid #b6dd68;border-radius:16px;">
                  <p style="margin:0;color:#5d666d;font-size:16px;line-height:1.7;">We received your wholesale application for <strong style="color:#245a35;">${escapeHtml(businessName)}</strong>. Our team will review your information and follow up by email.</p>
                </div>
                <p style="margin:0;color:#5d666d;font-size:16px;line-height:1.7;">
                  If you need to add anything, reply to this email or contact
                  <a href="mailto:${INFO_INBOX}" style="color:#245a35;font-weight:700;text-decoration:none;">${INFO_INBOX}</a>.
                </p>
              </div>
            </div>
          </body>
        </html>`,
    });
  } catch (error) {
    console.error("Resend wholesale email failed", error);

    return Response.json(
      { error: "Unable to deliver the wholesale application." },
      { status: 502 },
    );
  }

  return Response.json({ received: true });
}
