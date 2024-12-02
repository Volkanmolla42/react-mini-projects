import { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    "eat Breakfast",
    "take a shower",
    "walk a dog",
  ]);
  const [newTask, setNewTask] = useState("");
  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    } else {
      alert("Please enter task");
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];

      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];

      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }
  return (
    <div className="todo-list">
      <h1>To-Do-List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task... "
          value={newTask}
          onChange={handleInputChange}
        />
        <button type="button" className="add-button" onClick={addTask}>
          Add
        </button>
        <ol>
          {tasks.map((task, index) => (
            <li key={index}>
              <span className="task">{task} </span>
              <button
                type="button"
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                type="button"
                className="move-button"
                onClick={() => moveTaskUp(index)}
              >
                👆
              </button>
              <button
                type="button"
                className="move-button"
                onClick={() => moveTaskDown(index)}
              >
                👇
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TodoList;
