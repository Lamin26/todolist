import React, { useState } from "react";

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState({ title: "", description: "" });

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) {
      return; // Don't submit if the title is empty
    }
    addTask(task); // Call addTask prop from App.js
    setTask({ title: "", description: "" }); // Clear input fields
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task title"
        required
      />
      <input
        type="text"
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task description"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
