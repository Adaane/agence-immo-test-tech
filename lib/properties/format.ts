const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const surfaceFormatter = new Intl.NumberFormat("fr-FR", {
  maximumFractionDigits: 2,
});

export function formatPrice(price: number | null): string {
  return price === null ? "Prix sur demande" : priceFormatter.format(price);
}

export function formatSurface(surface: number): string {
  return `${surfaceFormatter.format(surface)} m²`;
}
