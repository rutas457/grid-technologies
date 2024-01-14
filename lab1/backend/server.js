const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let habits = [];

app.get('/api/habits', (req, res) => {
  res.json(habits);
});

app.post('/api/habits', (req, res) => {
  const newHabit = { ...req.body, id: uuidv4() };
  habits.push(newHabit);
  res.status(201).json(newHabit);
});

app.delete('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  habits = habits.filter(habit => habit.id !== id);
  res.status(200).send('Habit deleted');
});

app.put('/api/habits/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const habitIndex = habits.findIndex(habit => habit.id === id);

  if (habitIndex !== -1) {
    habits[habitIndex] = { ...habits[habitIndex], completed };
    res.json(habits[habitIndex]);
  } else {
    res.status(404).send('Habit not found');
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
