import React, { useState, useEffect } from 'react';
import Habit from './Habit';
import AddHabitForm from './AddHabitForm';
import List from '@mui/material/List';

const HabitList = () => {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    const response = await fetch('http://localhost:5000/api/habits');
    const data = await response.json();
    setHabits(data);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const addHabit = async (newHabit) => {
    const response = await fetch('http://localhost:5000/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: newHabit, completed: false }),
    });
    if (response.ok) {
      fetchHabits();
    }
  };

  const deleteHabit = async (habitId) => {
    const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setHabits(habits.filter(habit => habit.id !== habitId));
    }
  };

  const toggleComplete = async (habitId) => {
    const updatedHabits = habits.map(habit =>
      habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
  };

  return (
    <>
      <AddHabitForm onAdd={addHabit} />
      <List>
        {habits.map((habit, index) => (
          <Habit key={index} id={habit.id} title={habit.title} completed={habit.completed} onDelete={deleteHabit} onToggle={toggleComplete} />
        ))}
      </List>
    </>
  );
};

export default HabitList;
