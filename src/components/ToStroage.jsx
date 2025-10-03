import "../style/Todo.css";
import { useState, useEffect } from "react";

// ToStorage: Todo app with localStorage, modern UI and comments for quick review
export default function ToStorage() {
  // --- state ---
  const [todo, setTodo] = useState(""); // controlled input value
  const [items, setItems] = useState([]); // list of todos

  // handle controlled input change
  const handleTodo = (e) => setTodo(e.target.value);

  // add item (ignore empty/whitespace)
  const handleAdd = () => {
    const value = todo.trim();
    if (!value) return;
    setItems((prev) => [...prev, value]);
    setTodo("");
  };

  // allow Enter key to add
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  // delete by index
  const handleDelete = (indexToRemove) => {
    setItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  // load from localStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        // ignore parse errors
        console.error("Failed to parse saved todos", e);
      }
    }
  }, []);

  // persist to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);

  // clear all todos
  const clearAll = () => setItems([]);

  return (
    <div className="todo-root">
      <main className="todo-card" aria-labelledby="todo-title">
        <h1 id="todo-title" className="title">ToDo (localStorage)</h1>

        {/* input area */}
        <div className="input-row">
          <input
            type="text"
            className="input"
            placeholder="Add a new task and press Enter or click Add"
            value={todo}
            onChange={handleTodo}
            onKeyDown={handleKeyDown}
            aria-label="Todo input"
          />

          <div className="buttons">
            <button className="btn" onClick={handleAdd} aria-label="Add todo">
              Add
            </button>
            <button
              className="btn ghost"
              onClick={clearAll}
              aria-label="Clear all todos"
              disabled={items.length === 0}
            >
              Clear
            </button>
          </div>
        </div>

        {/* list area */}
        <section className="list-wrap" aria-live="polite">
          {items.length === 0 ? (
            <div className="empty">No todos yet — add your first task.</div>
          ) : (
            <ul className="list">
              {items.map((text, idx) => (
                <li className="list-item" key={idx}>
                  <span className="item-text">{text}</span>
                  <button
                    className="del"
                    onClick={() => handleDelete(idx)}
                    aria-label={`Delete todo ${text}`}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
