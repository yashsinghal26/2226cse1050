// Types
export interface PricePoint {
  price: number;
  lastUpdatedAt: string; // ISO string
}

// Average price
export function average(prices: number[]): number {
  if (prices.length === 0) return NaN;
  return prices.reduce((sum, p) => sum + p, 0) / prices.length;
}

// Standard deviation
export function stddev(prices: number[]): number {
  if (prices.length < 2) return NaN;
  const avg = average(prices);
  const variance = prices.reduce((sum, p) => sum + (p - avg) ** 2, 0) / (prices.length - 1);
  return Math.sqrt(variance);
}

// Covariance
export function covariance(xs: number[], ys: number[]): number {
  if (xs.length !== ys.length || xs.length < 2) return NaN;
  const avgX = average(xs);
  const avgY = average(ys);
  let cov = 0;
  for (let i = 0; i < xs.length; i++) {
    cov += (xs[i] - avgX) * (ys[i] - avgY);
  }
  return cov / (xs.length - 1);
}

// Pearson correlation
export function pearson(xs: number[], ys: number[]): number {
  const cov = covariance(xs, ys);
  const stdX = stddev(xs);
  const stdY = stddev(ys);
  if (isNaN(cov) || isNaN(stdX) || isNaN(stdY) || stdX === 0 || stdY === 0) return NaN;
  return cov / (stdX * stdY);
}

// Align two price series by closest timestamp (returns [xs, ys] arrays)
export function alignPriceSeries(a: PricePoint[], b: PricePoint[]): [number[], number[]] {
  // For each point in a, find the closest in b
  const xs: number[] = [];
  const ys: number[] = [];
  for (const pa of a) {
    let minDiff = Infinity;
    let closest: PricePoint | null = null;
    for (const pb of b) {
      const diff = Math.abs(new Date(pa.lastUpdatedAt).getTime() - new Date(pb.lastUpdatedAt).getTime());
      if (diff < minDiff) {
        minDiff = diff;
        closest = pb;
      }
    }
    if (closest) {
      xs.push(pa.price);
      ys.push(closest.price);
    }
  }
  return [xs, ys];
} 