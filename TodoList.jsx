import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = (event) => {
    event.preventDefault();
    const todoText = event.target.todo.value;
    if (todoText.trim() !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: todoText,
      };
      setTodos([...todos, newTodo]);
      event.target.todo.value = "";
    }
  };

  const handleCompleteTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    setTodos(todos.filter((todo) => todo.id !== id));
    setCompletedTodos([...completedTodos, todo]);
  };

  const handleDeleteTodo = (id, isCompleted) => {
    if (isCompleted) {
      setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const handleMoveToTodo = (id) => {
    const todo = completedTodos.find((todo) => todo.id === id);
    setCompletedTodos(completedTodos.filter((todo) => todo.id !== id));
    setTodos([...todos, todo]);
  };

  return (
    <div className="jobs ">
      <h1>To-Do List</h1>
      <form className="job-form" onSubmit={handleAddTodo}>
        <input type="text" name="todo" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>

      <div className="jobs-item">
        <h2>To be performed:</h2>
        {todos.length > 0 ? (
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => handleCompleteTodo(todo.id)}>
                  Finish
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks to be performed.</p>
        )}
      </div>

      <div className="jobs-item">
        <h2>Completed works:</h2>
        {completedTodos.length > 0 ? (
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                {todo.text}
                <button onClick={() => handleDeleteTodo(todo.id, true)}>
                  Delete
                </button>
                <button onClick={() => handleMoveToTodo(todo.id)}>
                  Move to To-Do
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No completed tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
