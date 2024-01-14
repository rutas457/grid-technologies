import React from 'react';
import HabitList from './components/HabitList';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        Habit Tracker
      </Typography>
      <HabitList />
    </Container>
  );
}

export default App;
