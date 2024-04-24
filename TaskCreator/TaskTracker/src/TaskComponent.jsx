import React from 'react';

function TaskComponent({ task, onDelete, onUpdate }) {
  return (
    <div className="task">
      <h3>{task.title} <button onClick={() => onDelete(task)}>Delete</button></h3>
      <p>Description: {task.description}</p>
      <p>Start Date: {task.startDate.toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Assignee: {task.assignee}</p>
      <p>Priority: {task.priority}</p>
      {task.endDate && <p>End Date: {task.endDate.toLocaleDateString()}</p>}
      <select onChange={(e) => onUpdate(task, e.target.value)} value={task.status}>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
        <option value="Deployed">Deployed</option>
        <option value="Deferred">Deferred</option>
      </select>
    </div>
  );
}

export default TaskComponent;
