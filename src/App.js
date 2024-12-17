import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [scramble, setScramble] = useState(generateScramble());
  const [userAnswer, setUserAnswer] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  function generateScramble() {
    const words = ["task", "list", "add", "todo", "puzzle"];
    const word = words[Math.floor(Math.random() * words.length)];
    const scrambled = word.split("").sort(() => 0.5 - Math.random()).join("");
    return { word, scrambled };
  }

  const handleAddTask = () => {
    if (newTask.trim() === "") return alert("Task cannot be empty!");

    if (!isEditing) {
      if (userAnswer !== scramble.word) return alert("Incorrect answer to the puzzle!");

      setTasks([...tasks, { id: Date.now(), title: newTask }]);
      setScramble(generateScramble());
      setUserAnswer("");
    } else {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, title: newTask } : task
        )
      );
      setIsEditing(false);
      setEditTaskId(null);
    }

    setNewTask("");
  };

  const handleEditTask = (taskId, currentTitle) => {
    setIsEditing(true);
    setEditTaskId(taskId);
    setNewTask(currentTitle);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleViewAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/tasks"); // Replace with your backend URL
      if (!response.ok) throw new Error("Failed to fetch tasks");

      const data = await response.json();
      setTasks(data); // Update tasks state with backend data
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      alert("Failed to fetch tasks. Please try again later.");
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          placeholder={isEditing ? "Edit task title" : "Task title"}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div>
          {!isEditing && (
            <>
              <p>Unscramble this word to add the task:</p>
              <strong>{scramble.scrambled}</strong>
              <input
                type="text"
                placeholder="Your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </>
          )}
        </div>
        <button onClick={handleAddTask}>
          {isEditing ? "Save Changes" : "Add Task"}
        </button>
        <button onClick={handleViewAllTasks} style={{ marginLeft: "10px" }}>
          View All Tasks
        </button>
      </div>
      <div className="task-list">
        <h2>Task List</h2>
        {tasks.length === 0 ? (
          <p>No tasks yet!</p>
        ) : (
          tasks.map((task) => (
            <div className="task-item" key={task.id}>
              <span>{task.title}</span>
              <button onClick={() => handleEditTask(task.id, task.title)}>
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
