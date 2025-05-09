import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/evaluation-service/stocks';

// Simple in-memory cache
const cache: Record<string, any> = {};

export async function getStocks() {
  if (cache['stocks']) return cache['stocks'];
  const response = await axios.get(BASE_URL);
  cache['stocks'] = response.data.stocks;
  return response.data.stocks;
}

export async function getStockPriceHistory(ticker: string, minutes: number) {
  const cacheKey = `${ticker}_${minutes}`;
  if (cache[cacheKey]) return cache[cacheKey];
  const response = await axios.get(`${BASE_URL}/${ticker}?minutes=${minutes}`);
  cache[cacheKey] = response.data;
  return response.data;
}

export async function getStockCurrentPrice(ticker: string) {
  const cacheKey = `${ticker}_current`;
  if (cache[cacheKey]) return cache[cacheKey];
  const response = await axios.get(`${BASE_URL}/${ticker}`);
  cache[cacheKey] = response.data;
  return response.data;
} 