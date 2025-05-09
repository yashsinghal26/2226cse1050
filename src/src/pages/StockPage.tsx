import React, { useEffect, useState } from 'react';
import { getStocks, getStockPriceHistory } from '../services/stockApi';
import StockSelector from '../components/StockSelector';
import TimeIntervalSelector from '../components/TimeIntervalSelector';
import PriceChart from '../components/PriceChart';
import { average } from '../utils/calculationUtils';
import { Box, CircularProgress, Alert } from '@mui/material';

const DEFAULT_INTERVAL = 10;

const StockPage: React.FC = () => {
  const [stocks, setStocks] = useState<{ [name: string]: string }>({});
  const [selected, setSelected] = useState<string>('');
  const [interval, setInterval] = useState<number>(DEFAULT_INTERVAL);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getStocks().then(setStocks).catch(() => setError('Failed to fetch stocks'));
  }, []);

  useEffect(() => {
    if (!selected || !interval) return;
    setLoading(true);
    setError(null);
    getStockPriceHistory(selected, interval)
      .then((data) => {
        setHistory(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch price history');
        setLoading(false);
      });
  }, [selected, interval]);

  const avg = average(history.map((h) => h.price));

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box mb={2} display="flex" gap={2}>
        <Box flex={2}>
          <StockSelector
            stocks={stocks}
            value={selected}
            onChange={setSelected}
          />
        </Box>
        <Box flex={1}>
          <TimeIntervalSelector value={interval} onChange={setInterval} />
        </Box>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
      ) : (
        history.length > 0 && selected ? (
          <PriceChart data={history} average={avg} />
        ) : (
          <Box mt={4} textAlign="center">Select a stock and interval to view chart.</Box>
        )
      )}
    </Box>
  );
};

export default StockPage; 