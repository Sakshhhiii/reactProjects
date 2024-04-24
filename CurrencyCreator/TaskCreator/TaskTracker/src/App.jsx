import React, { useState } from 'react'
import Task from './TaskModel';
import TaskComponent from './TaskComponent';
import './App.css'


function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('Pending');
  const [sortCriterion, setSortCriterion] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1, // Simple ID assignment; consider using a UUID for real applications
      title,
      description,
      startDate: new Date().toISOString().slice(0, 10), // ISO string format "YYYY-MM-DD"
      status,
      assignee,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (task && task.status === "Completed") {
      alert("Completed tasks cannot be deleted.");
      return;
    }
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task));
  };

  let filteredTasks = tasks.filter(task => {
    const taskStartDate = new Date(task.startDate);
    const filterStart = startDateFilter ? new Date(startDateFilter) : null;
    const filterEnd = endDateFilter ? new Date(endDateFilter) : null;
    return (
      (filterAssignee ? task.assignee.toLowerCase().includes(filterAssignee.toLowerCase()) : true) &&
      (filterPriority ? task.priority === filterPriority : true) &&
      (filterStart ? taskStartDate >= filterStart : true) &&
      (filterEnd ? taskStartDate <= filterEnd : true)
    );
  });

  filteredTasks.sort((a, b) => {
    if (sortCriterion === 'priority') {
      return ['P0', 'P1', 'P2'].indexOf(a.priority) - ['P0', 'P1', 'P2'].indexOf(b.priority);
    } else if (sortCriterion === 'startDate') {
      return new Date(a.startDate) - new Date(b.startDate);
    }
    return 0;
  });

  const taskStatuses = ["Pending", "In Progress", "Completed", "Deployed", "Deferred"];

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <div className="form-section">
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">Select Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Deployed">Deployed</option>
          <option value="Deferred">Deferred</option>
        </select>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filters">
      <div className="sort-options">
      <label>Sort by: </label>
        <select onChange={(e) => setSortCriterion(e.target.value)}>
          <option value="">Select..</option>
          <option value="assignee">assignee</option>
          <option value="priority">Priority</option>
          <option value="startDate">Start Date</option>
        </select>
        </div>
        <div className="filter-options">
        <input
          type="text"
          placeholder="Filter by Assignee"
          value={filterAssignee}
          onChange={(e) => setFilterAssignee(e.target.value)}
        />
        <select onChange={(e) => setFilterPriority(e.target.value)} value={filterPriority}>
          <option value="">Filter by Priority</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>
        <input
          type="date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
        <input
          type="date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
        />
        </div>
        <div className="sorting">
    <label>Sort by: </label>
    <select onChange={(e) => setSortCriterion(e.target.value)}>
      <option value="">None</option>
      <option value="priority">Priority</option>
    </select>
  </div>
      </div>
      {/* Tasks Display by Status */}
      <div className="status-columns-container" style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
        {taskStatuses.map((status) => (
          <div key={status} className="status-column">
            <h2>{status}</h2>
            {filteredTasks
              .filter(task => task.status === status)
              .map((task, index) => (
                <div key={index} className="task-card">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p>Assignee: {task.assignee}</p>
                  <p>Priority: {task.priority}</p>
                  <p>Start Date: {task.startDate}</p>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                  {/* Optionally, if you want to allow status update from here */}
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Deployed">Deployed</option>
                    <option value="Deferred">Deferred</option>
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;



