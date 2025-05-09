import React from 'react';
import { Box, Button, TextField } from '@mui/material';

interface TimeIntervalSelectorProps {
  value: number;
  onChange: (m: number) => void;
}

const presets = [10, 30, 60];

const TimeIntervalSelector: React.FC<TimeIntervalSelectorProps> = ({ value, onChange }) => {
  const [custom, setCustom] = React.useState('');

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {presets.map((m) => (
        <Button
          key={m}
          variant={value === m ? 'contained' : 'outlined'}
          onClick={() => { onChange(m); setCustom(''); }}
        >
          Last {m} min
        </Button>
      ))}
      <TextField
        label="Custom (min)"
        type="number"
        size="small"
        value={custom}
        onChange={e => {
          setCustom(e.target.value);
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) onChange(num);
        }}
        inputProps={{ min: 1 }}
        style={{ width: 120 }}
      />
    </Box>
  );
};

export default TimeIntervalSelector; 