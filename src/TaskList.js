import React, { useState } from "react";

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const [editing, setEditing] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ title: "", description: "" });

  const handleEdit = (task) => {
    setEditing(task._id);
    setUpdatedTask({ title: task.title, description: task.description });
  };

  const handleUpdate = (id) => {
    updateTask(id, updatedTask);
    setEditing(null); // Reset editing state after update
  };

  const handleDelete = (id) => {
    deleteTask(id);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editing === task._id ? (
              <>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={updatedTask.description}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, description: e.target.value })
                  }
                />
                <button onClick={() => handleUpdate(task._id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>: <span>{task.description}</span>
                <button onClick={() => handleEdit(task)}>Edit</button>
                <button onClick={() => handleDelete(task._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
