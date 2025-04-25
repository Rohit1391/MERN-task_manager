import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css';

const AddTask = ({ onTaskAdded }) => {
  const [task, setTask] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      await axios.post('https://mern-task-manager-2-gkhx.onrender.com', { title: task });
      setTask('');
      onTaskAdded(); // refresh tasks in parent
    }
  };

  return (
    <div className="add-task-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
