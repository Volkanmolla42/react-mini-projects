import { useState } from "react";
import "./CSS/Todo.css";
import { useRef } from "react";
import { useEffect } from "react";
import TodoItems from "./TodoItems";

let count = 0;
const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);
  //add todos to the list

  const add = addRef();
  function addRef() {
    return () => {
      setTodos([
        ...todos,
        { no: count++, text: inputRef.current.value, display: "" },
      ]);
      inputRef.current.value = "";
      localStorage.setItem("todos_count", count);
    };
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);
  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("todos", JSON.stringify(todos));
    }, 1);
  }, [todos]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        add();
      }
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("keypress", handleKeyPress);
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      if (inputElement) {
        inputElement.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, [add, inputRef]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
        />
        <div
          onClick={() => {
            add();
          }}
          className="todo-add-btn"
        >
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((items, index) => {
          return (
            <TodoItems
              key={index}
              setTodos={setTodos}
              no={items.no}
              display={items.display}
              text={items.text}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
