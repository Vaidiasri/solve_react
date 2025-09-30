import { useState } from "react";

export default function Todo() {
  const [todo, setTodo] = useState("");
  const [add, setAdd] = useState([]);
  const [completed, setCompleted] = useState([]);

  const handleAdd = () => {
    if (!todo.trim()) return;
    setAdd([...add, { text: todo, completed: false }]);
    setTodo("");
  };

  const handleComplete = (index) => {
    const update = [...add];
    update[index].completed = true;
    setAdd(update);

    setTimeout(() => {
      setCompleted((prev) => [...prev, update[index]]);
      setAdd((prev) => prev.filter((_, i) => i !== index));
    }, 5000);
  };

  return (
    <div className="todo-container">
      <div className="todo-input-section">
        <input
          type="text"
          placeholder="Add todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={handleAdd} className="add-btn">Add</button>
      </div>

      <div className="todo-section">
        <h3>Pending Todos</h3>
        <ul className="todo-list">
          {add.map((item, index) => (
            <li key={index} className="todo-item">
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => handleComplete(index)}
                className="todo-checkbox"
              />
              <span className={item.completed ? "completed-text" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="todo-section">
        <h3>Completed Todos</h3>
        <ul className="todo-list">
          {completed.map((item, index) => (
            <li key={index} className="todo-item completed-item">{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
