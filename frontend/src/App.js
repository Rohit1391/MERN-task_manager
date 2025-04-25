import React, { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get('https://mern-task-manager-2-gkhx.onrender.com/api/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <AddTask onTaskAdded={fetchTasks} />
      <TaskList tasks={tasks} onDeleteOrUpdate={fetchTasks} />
    </div>
  );
}

export default App;
