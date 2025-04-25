import React, { useState }  from 'react';
import axios from 'axios';
import './TaskList.css'; // Import styles

const TaskList = ({ tasks, onDeleteOrUpdate }) => {

    const [editingTaskId, setEditingTaskId] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
  
    const handleDelete = async (id) => {
      await axios.delete(`https://mern-task-manager-2-gkhx.onrender.com/${id}`);
      onDeleteOrUpdate(); // Re-fetch tasks
    };
  
    const handleUpdate = async (id) => {
      await axios.put(`https://mern-task-manager-2-gkhx.onrender.com/${id}`, {
        title: updatedTitle,
      });
      setEditingTaskId(null);
      onDeleteOrUpdate(); // Re-fetch tasks
    };
    const handleEdit = (task) => {
        setEditingTaskId(task._id);
        setUpdatedTitle(task.title);
      };
      
  
    return (
      <div className="task-list-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-item">
            {editingTaskId === task._id ? (
              <>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <div className="task-item-buttons">
                  <button onClick={() => handleUpdate(task._id)}>Save</button>
                  <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <div className="task-item-buttons">
                  <button onClick={() => handleEdit(task)}>Edit task</button>
                  <button onClick={() => handleDelete(task._id)}>Delete task</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };
  
export default TaskList;
