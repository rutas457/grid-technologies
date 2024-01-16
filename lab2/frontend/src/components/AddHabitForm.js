import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';

const AddHabitForm = ({ onAdd }) => {
  const [habit, setHabit] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!habit) return;
    onAdd(habit);
    setHabit('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="New Habit"
        variant="outlined"
        fullWidth
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Add Habit
      </Button>
    </Box>
  );
};

export default AddHabitForm;
