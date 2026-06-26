export const FREE_SHIPPING_THRESHOLD_CENTS = 9000;

export function qualifiesForFreeShipping(subtotalCents: number) {
  return subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
}

export function getEffectiveShippingCents(
  subtotalCents: number,
  standardShippingCents: number,
) {
  return qualifiesForFreeShipping(subtotalCents) ? 0 : standardShippingCents;
}
