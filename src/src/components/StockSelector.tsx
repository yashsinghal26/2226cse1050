import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface StockSelectorProps {
  stocks: { [name: string]: string };
  value: string;
  onChange: (ticker: string) => void;
}

const StockSelector: React.FC<StockSelectorProps> = ({ stocks, value, onChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="stock-select-label">Stock</InputLabel>
      <Select
        labelId="stock-select-label"
        value={value}
        label="Stock"
        onChange={e => onChange(e.target.value as string)}
      >
        {Object.entries(stocks).map(([name, ticker]) => (
          <MenuItem key={ticker} value={ticker}>
            {name} ({ticker})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StockSelector; 