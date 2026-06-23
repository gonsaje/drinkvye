import { products } from "@/lib/products";

type CheckoutItemInput = {
  productId: string;
  quantity: number;
};

type CheckoutCustomerInput = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip?: string;
};

type CheckoutPayload = {
  customer?: CheckoutCustomerInput;
  items?: CheckoutItemInput[];
};

const stripeCheckoutUrl = "https://api.stripe.com/v1/checkout/sessions";
const stripeCustomersUrl = "https://api.stripe.com/v1/customers";

function getOrigin(request: Request) {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredOrigin) return configuredOrigin.replace(/\/$/, "");

  return new URL(request.url).origin;
}

function normalizeQuantity(quantity: unknown) {
  const parsedQuantity =
    typeof quantity === "number" ? quantity : Number(quantity);

  if (!Number.isFinite(parsedQuantity)) return 1;

  return Math.max(1, Math.min(99, Math.round(parsedQuantity)));
}

function compactValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeUsPhoneNumber(value: unknown) {
  const digits = compactValue(value).replace(/\D/g, "");
  const nationalNumber =
    digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;

  if (nationalNumber.length !== 10) {
    throw new Error("Enter a valid 10-digit U.S. phone number.");
  }

  return `+1${nationalNumber}`;
}

function buildShippingSummary(customer: CheckoutCustomerInput) {
  return [
    compactValue(customer.address),
    compactValue(customer.address2),
    [compactValue(customer.city), compactValue(customer.state)]
      .filter(Boolean)
      .join(", "),
    compactValue(customer.zip),
  ]
    .filter(Boolean)
    .join(" ");
}

function getRequiredShippingValue(
  customer: CheckoutCustomerInput,
  key: keyof CheckoutCustomerInput,
  label: string,
) {
  const value = compactValue(customer[key]);

  if (!value) {
    throw new Error(`${label} is required for shipping.`);
  }

  return value;
}

function getShippingCents() {
  const configuredShipping = process.env.VYE_STANDARD_SHIPPING_CENTS;

  if (!configuredShipping) return 0;

  const parsedShipping = Number(configuredShipping);

  if (!Number.isFinite(parsedShipping)) return 0;

  return Math.max(0, Math.round(parsedShipping));
}

function createOrderReference() {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSegment = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `VYE-${timestamp}-${randomSegment}`;
}

function appendShippingOption(formData: URLSearchParams) {
  const shippingRateId = compactValue(
    process.env.STRIPE_STANDARD_SHIPPING_RATE_ID,
  );

  if (shippingRateId) {
    formData.append("shipping_options[0][shipping_rate]", shippingRateId);
    return;
  }

  formData.append("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
  formData.append(
    "shipping_options[0][shipping_rate_data][fixed_amount][amount]",
    `${getShippingCents()}`,
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][fixed_amount][currency]",
    "usd",
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][display_name]",
    "Standard shipping",
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]",
    "business_day",
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]",
    "3",
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]",
    "business_day",
  );
  formData.append(
    "shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]",
    "7",
  );
}

async function createStripeCustomer(
  stripeSecretKey: string,
  customer: CheckoutCustomerInput,
) {
  const firstName = getRequiredShippingValue(customer, "firstName", "First name");
  const lastName = getRequiredShippingValue(customer, "lastName", "Last name");
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const email = getRequiredShippingValue(customer, "email", "Email");
  const phone = normalizeUsPhoneNumber(
    getRequiredShippingValue(customer, "phone", "Phone"),
  );
  const address = getRequiredShippingValue(
    customer,
    "address",
    "Street address",
  );
  const city = getRequiredShippingValue(customer, "city", "City");
  const state = getRequiredShippingValue(customer, "state", "State");
  const zip = getRequiredShippingValue(customer, "zip", "ZIP");
  const customerData = new URLSearchParams({
    email,
    name: fullName,
    phone,
    "shipping[name]": fullName,
    "shipping[phone]": phone,
    "shipping[address][line1]": address,
    "shipping[address][city]": city,
    "shipping[address][state]": state,
    "shipping[address][postal_code]": zip,
    "shipping[address][country]": "US",
    "address[line1]": address,
    "address[city]": city,
    "address[state]": state,
    "address[postal_code]": zip,
    "address[country]": "US",
  });
  const address2 = compactValue(customer.address2);

  if (address2) {
    customerData.append("shipping[address][line2]", address2);
    customerData.append("address[line2]", address2);
  }

  const customerResponse = await fetch(stripeCustomersUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: customerData,
  });
  const stripeCustomer = (await customerResponse.json()) as {
    error?: { message?: string };
    id?: string;
  };

  if (!customerResponse.ok || !stripeCustomer.id) {
    throw new Error(
      stripeCustomer.error?.message ?? "Stripe could not create a customer.",
    );
  }

  return stripeCustomer.id;
}

function appendLineItem(
  formData: URLSearchParams,
  index: number,
  item: CheckoutItemInput,
) {
  const product = products.find(
    (productItem) => productItem.id === item.productId,
  );

  if (!product) return false;

  const stripePriceId = compactValue(process.env[product.stripePriceEnv]);

  if (!stripePriceId) {
    throw new Error(
      `Stripe is missing ${product.stripePriceEnv} for ${product.name}.`,
    );
  }

  formData.append(`line_items[${index}][quantity]`, `${item.quantity}`);
  formData.append(`line_items[${index}][price]`, stripePriceId);

  return true;
}

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return Response.json(
      { error: "Stripe is missing STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  let payload: CheckoutPayload;

  try {
    payload = (await request.json()) as CheckoutPayload;
  } catch {
    return Response.json({ error: "Invalid checkout payload." }, { status: 400 });
  }

  const items =
    payload.items
      ?.map((item) => ({
        productId: compactValue(item.productId),
        quantity: normalizeQuantity(item.quantity),
      }))
      .filter((item) =>
        products.some((product) => product.id === item.productId),
      ) ?? [];

  if (!items.length) {
    return Response.json({ error: "Cart is empty." }, { status: 400 });
  }

  const missingPriceProduct = items
    .map((item) => products.find((product) => product.id === item.productId))
    .find(
      (product) =>
        product && !compactValue(process.env[product.stripePriceEnv]),
    );

  if (missingPriceProduct) {
    return Response.json(
      {
        error: `Stripe is missing ${missingPriceProduct.stripePriceEnv} for ${missingPriceProduct.name}.`,
      },
      { status: 500 },
    );
  }

  const customer = payload.customer ?? {};
  const origin = getOrigin(request);
  const fullName = [
    compactValue(customer.firstName),
    compactValue(customer.lastName),
  ]
    .filter(Boolean)
    .join(" ");
  const shippingSummary = buildShippingSummary(customer);
  const orderReference = createOrderReference();
  let stripeCustomerId = "";

  try {
    stripeCustomerId = await createStripeCustomer(stripeSecretKey, customer);
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe could not create a customer.",
      },
      { status: 400 },
    );
  }

  const formData = new URLSearchParams({
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    billing_address_collection: "auto",
    customer: stripeCustomerId,
    client_reference_id: orderReference,
    "payment_intent_data[receipt_email]": compactValue(customer.email),
    "payment_intent_data[metadata][order_reference]": orderReference,
  });

  formData.append("metadata[order_reference]", orderReference);
  const phone = compactValue(customer.phone);

  if (fullName) formData.append("metadata[customer_name]", fullName);
  if (phone) formData.append("metadata[phone]", phone);
  if (shippingSummary) {
    formData.append("metadata[shipping_address]", shippingSummary);
  }

  let lineItemIndex = 0;

  try {
    for (const item of items) {
      if (appendLineItem(formData, lineItemIndex, item)) {
        lineItemIndex += 1;
      }
    }
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Stripe product pricing is not configured.",
      },
      { status: 500 },
    );
  }

  appendShippingOption(formData);

  const stripeResponse = await fetch(stripeCheckoutUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  const session = (await stripeResponse.json()) as {
    client_secret?: string;
    error?: { message?: string };
    id?: string;
  };

  if (!stripeResponse.ok || !session.client_secret) {
    return Response.json(
      {
        error:
          session.error?.message ??
          "Stripe could not create a checkout session.",
      },
      { status: 502 },
    );
  }

  return Response.json({ clientSecret: session.client_secret, id: session.id });
}
