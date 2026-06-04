export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `MAK-${timestamp}-${random}`;
}

export function calculateDeliveryFee(subtotal: number, zone?: string): number {
  if (zone) {
    const match = DELIVERY_ZONES.find(z => z.name === zone);
    if (match) return subtotal >= match.minOrder ? match.fee : match.fee + 5;
  }
  return subtotal >= 150 ? 0 : 15;
}