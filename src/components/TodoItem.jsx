import { useState } from "react";

export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(item.text);

  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdate(item.id, value);
    setIsEditing(false);
  };

  return (
    <li className="todo-item card">
      <div className="todo-item__main">
        <label className="checkbox">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => onToggle(item.id)}
          />
          <span />
        </label>

        {isEditing ? (
          <form className="todo-item__edit" onSubmit={handleSubmit}>
            <input
              className="input input--condensed"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            <button className="button button--ghost" type="submit">
              Save
            </button>
          </form>
        ) : (
          <span
            className={`todo-item__text ${
              item.completed ? "todo-item__text--done" : ""
            }`}
          >
            {item.text}
          </span>
        )}
      </div>

      <div className="todo-item__actions">
        <button
          className="button button--ghost"
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
        <button
          className="button button--ghost danger"
          type="button"
          onClick={() => onDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
