import TodoItem from "./TodoItem";

export default function TodoList({ items, onToggle, onDelete, onUpdate }) {
  if (!items.length) {
    return <p className="muted">No tasks yet. Add one to get started.</p>;
  }

  return (
    <ul className="todo-list">
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
