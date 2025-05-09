import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine, ResponsiveContainer } from 'recharts';

interface PricePoint {
  price: number;
  lastUpdatedAt: string;
}

interface PriceChartProps {
  data: PricePoint[];
  average: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, average }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="lastUpdatedAt" tickFormatter={t => new Date(t).toLocaleTimeString()} />
        <YAxis domain={['auto', 'auto']} />
        <Tooltip labelFormatter={l => new Date(l).toLocaleString()} formatter={(v: number) => v.toFixed(2)} />
        <Line type="monotone" dataKey="price" stroke="#1976d2" dot={true} />
        <ReferenceLine y={average} label="Avg" stroke="#d32f2f" strokeDasharray="3 3" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PriceChart; 