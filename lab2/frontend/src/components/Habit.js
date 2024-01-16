import React from 'react';
import { ListItem, ListItemText} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const Habit = ({ id, title, completed, onToggle, onDelete }) => {

  const handleDelete = async () => {
    onDelete(id);
  };

  const handleToggle = async () => {
      const response = await fetch(`http://localhost:5000/api/habits/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !completed }),
      });
      if (response.ok) {
        onToggle(id);
      }
    };

  return (
    <ListItem>
      <Checkbox
        checked={completed}
        onChange={handleToggle}
      />
      <ListItemText primary={title} style={{ textDecoration: completed ? 'line-through' : 'none' }} />
      <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default Habit;
