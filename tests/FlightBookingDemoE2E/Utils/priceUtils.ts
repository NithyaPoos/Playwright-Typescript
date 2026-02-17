export function extractPrice(priceText: string): number {
  return parseFloat(priceText.replace('$', '').trim());
}

export function getCheapest(prices: number[]): number {
  return Math.min(...prices);
}

