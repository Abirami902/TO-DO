import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const AddTaskPage = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName(''); 
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="taskName" className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default AddTaskPage;
