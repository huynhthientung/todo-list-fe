import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAdd(text);
    setText("");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <label htmlFor="todo-input" className="card__label">
        Add a task
      </label>
      <div className="card__row">
        <input
          id="todo-input"
          name="todo"
          className="input"
          placeholder="Buy groceries, book tickets..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="button button--primary" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
