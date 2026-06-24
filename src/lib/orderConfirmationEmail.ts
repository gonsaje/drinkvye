type OrderLineItem = {
  amountTotal: number;
  description: string;
  quantity: number;
};

type ShippingAddress = {
  city?: string | null;
  country?: string | null;
  line1?: string | null;
  line2?: string | null;
  postal_code?: string | null;
  state?: string | null;
};

export type OrderConfirmation = {
  amountShipping: number;
  amountTotal: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  lineItems: OrderLineItem[];
  orderId: string;
  shippingAddress?: ShippingAddress | null;
  stripeSessionId?: string;
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

function formatAddress(address?: ShippingAddress | null) {
  if (!address) return "";

  return [
    address.line1,
    address.line2,
    [address.city, address.state, address.postal_code]
      .filter(Boolean)
      .join(", "),
    address.country,
  ]
    .filter(Boolean)
    .join("\n");
}

function getPublicAssetUrl(path: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) return "";

  try {
    return new URL(path, siteUrl).toString();
  } catch {
    return "";
  }
}

function buildText(order: OrderConfirmation, businessEmail?: string) {
  const items = order.lineItems
    .map(
      (item) =>
        `${item.quantity} × ${item.description} — ${formatMoney(
          item.amountTotal,
          order.currency,
        )}`,
    )
    .join("\n");
  const shippingAddress = formatAddress(order.shippingAddress);

  return [
    `Thanks for your order${order.customerName ? `, ${order.customerName}` : ""}!`,
    "",
    `Order: ${order.orderId}`,
    "",
    items,
    "",
    `Shipping: ${formatMoney(order.amountShipping, order.currency)}`,
    `Total: ${formatMoney(order.amountTotal, order.currency)}`,
    shippingAddress ? `\nShipping to:\n${shippingAddress}` : "",
    "",
    "We’ll follow up when your order ships.",
    businessEmail
      ? `For any additional questions, please contact ${businessEmail}.`
      : "",
    "",
    "Vye",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function buildHtml(order: OrderConfirmation, businessEmail?: string) {
  const productImageUrl = getPublicAssetUrl("/vyeBottle.png");
  const itemRows = order.lineItems
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #b6dd68;">
            ${item.quantity} × ${escapeHtml(item.description)}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #b6dd68;text-align:right;">
            ${formatMoney(item.amountTotal, order.currency)}
          </td>
        </tr>`,
    )
    .join("");
  const shippingAddress = formatAddress(order.shippingAddress);
  const logoUrl = getPublicAssetUrl("/vye_logo_pink_f36f98.png");

  return `
    <!doctype html>
    <html>
      <body style="margin:0;background:#f36f98;color:#1f2933;font-family:Arial,sans-serif;">
        <div style="max-width:620px;margin:0 auto;padding:32px 20px;">
          <div style="background:#ffffff;border:1px solid #d7e4dc;border-radius:24px;padding:32px;">
            ${
              logoUrl
                ? `<div style="margin:0 0 24px;text-align:center;">
                    <img src="${escapeHtml(logoUrl)}" alt="Vye" width="112" style="display:inline-block;width:112px;height:auto;border:0;outline:none;text-decoration:none;" />
                  </div>`
                : ""
            }
            <p style="margin:0 0 8px;color:#245a35;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;">
              Order confirmed
            </p>
            <h1 style="margin:0 0 16px;font-size:30px;">
              Thanks for your order${order.customerName ? `, ${escapeHtml(order.customerName)}` : ""}!
            </h1>
            <p style="margin:0 0 24px;color:#5d666d;line-height:1.6;">
              We received your payment and are preparing your Vye order.
            </p>
            <p style="margin:0 0 20px;color:#5d666d;">
              Order <strong style="color:#245a35;">${escapeHtml(order.orderId)}</strong>
            </p>
            ${
              productImageUrl
                ? `<div style="margin:0 0 24px;text-align:center;background:#fff8ed;border:1px solid #d7e4dc;border-radius:18px;padding:18px;">
                    <img src="${escapeHtml(productImageUrl)}" alt="Vye Coconut Water" width="180" style="display:inline-block;width:180px;max-width:70%;height:auto;border:0;outline:none;text-decoration:none;" />
                  </div>`
                : ""
            }
            <table style="width:100%;border-collapse:collapse;font-size:15px;">
              ${itemRows}
              <tr>
                <td style="padding:12px 0 4px;">Shipping</td>
                <td style="padding:12px 0 4px;text-align:right;">${formatMoney(order.amountShipping, order.currency)}</td>
              </tr>
              <tr>
                <td style="padding:12px 0 0;font-size:18px;font-weight:700;color:#245a35;">Total</td>
                <td style="padding:12px 0 0;text-align:right;font-size:18px;font-weight:700;color:#245a35;">
                  ${formatMoney(order.amountTotal, order.currency)}
                </td>
              </tr>
            </table>
            ${
              shippingAddress
                ? `<div style="margin-top:28px;padding:18px;background:#fff8ed;border:1px solid #b6dd68;border-radius:16px;">
                    <strong style="color:#245a35;">Shipping to</strong>
                    <p style="margin:8px 0 0;white-space:pre-line;line-height:1.5;">${escapeHtml(shippingAddress)}</p>
                  </div>`
                : ""
            }
            <p style="margin:28px 0 0;color:#5d666d;line-height:1.6;">
              We’ll follow up when your order ships.
            </p>
            ${
              businessEmail
                ? `<p style="margin:14px 0 0;color:#5d666d;line-height:1.6;">
                    For any additional questions, please contact
                    <a href="mailto:${escapeHtml(businessEmail)}" style="color:#245a35;font-weight:700;text-decoration:none;">${escapeHtml(businessEmail)}</a>.
                  </p>`
                : ""
            }
          </div>
        </div>
      </body>
    </html>`;
}

export async function sendOrderConfirmation(order: OrderConfirmation) {
  const apiKey = process.env.RESEND_ORDERS_API_KEY;
  const from = process.env.VYE_ORDER_FROM_EMAIL;
  const businessEmail = process.env.VYE_BUSINESS_EMAIL;

  if (!apiKey || !from) {
    throw new Error(
      "Order email is missing RESEND_ORDERS_API_KEY or VYE_ORDER_FROM_EMAIL.",
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `order-confirmation/${
        order.stripeSessionId ?? order.orderId
      }`,
    },
    body: JSON.stringify({
      from,
      to: [order.customerEmail],
      bcc: businessEmail ? [businessEmail] : undefined,
      reply_to: businessEmail || undefined,
      subject: `Vye order confirmation — ${order.orderId}`,
      html: buildHtml(order, businessEmail),
      text: buildText(order, businessEmail),
      tags: [
        {
          name: "stripe_session",
          value: order.stripeSessionId ?? order.orderId,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend could not send confirmation: ${errorBody}`);
  }
}
