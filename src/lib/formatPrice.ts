const currencyFormatter = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
});

export function formatPrice(cents: number) {
  return currencyFormatter.format(cents / 100);
}
