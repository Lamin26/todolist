import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PuzzlePage() {
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [userAnswer, setUserAnswer] = useState("");
  const navigate = useNavigate();

  // Generate a random math puzzle
  function generatePuzzle() {
    const num1 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    const num2 = Math.floor(Math.random() * 10) + 1; // Random number 1-10
    return {
      question: `What is ${num1} + ${num2}?`, // Math question
      answer: num1 + num2, // Correct answer
    };
  }

  // Handle user submission
  const handleSubmit = () => {
    if (parseInt(userAnswer) === puzzle.answer) {
      alert("Correct! Redirecting to Add Task Page...");
      navigate("/add-task"); // Redirect to Add Task Page
    } else {
      alert("Incorrect answer. Please try again.");
      setPuzzle(generatePuzzle()); // Generate a new puzzle
      setUserAnswer(""); // Clear input
    }
  };

  return (
    <div className="App">
      <h1>Math Puzzle</h1>
      <p>Solve the puzzle below to add a new task:</p>
      <strong>{puzzle.question}</strong>
      <div>
        <input
          type="number"
          placeholder="Your answer"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={() => navigate("/")}>Cancel</button>
    </div>
  );
}

export default PuzzlePage;
