import { useEffect, useMemo, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import FilterControls from "./components/FilterControls";
import { BE_HOST } from "./config";
import "./App.css";

const FILTERS = ["all", "active", "completed"];
const STORAGE_KEY = "todo-list-fe::items";

export default function App() {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to read saved todos", error);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const filteredItems = useMemo(() => {
    const loweredQuery = search.trim().toLowerCase();
    return items.filter((item) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "active" && !item.completed) ||
        (filter === "completed" && item.completed);
      const matchesQuery = !loweredQuery
        ? true
        : item.text.toLowerCase().includes(loweredQuery);
      return matchesFilter && matchesQuery;
    });
  }, [items, filter, search]);

  const stats = useMemo(() => {
    const completed = items.filter((item) => item.completed).length;
    return {
      completed,
      total: items.length,
    };
  }, [items]);

  const addItem = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) => [
      ...prev,
      { id: uuid(), text: trimmed, completed: false },
    ]);
  };

  const toggleItem = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: trimmed } : item))
    );
  };

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.completed));
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Todo List</h1>
        <p>Stay organized with a minimal React todo app.</p>
        <p className="muted small">
          Backend host: <code>{BE_HOST}</code>
        </p>
      </header>

      <main className="app__content">
        <TodoForm onAdd={addItem} />

        <FilterControls
          filters={FILTERS}
          activeFilter={filter}
          onChangeFilter={setFilter}
          search={search}
          onSearchChange={setSearch}
          stats={stats}
          onClearCompleted={clearCompleted}
        />

        <TodoList
          items={filteredItems}
          onToggle={toggleItem}
          onDelete={deleteItem}
          onUpdate={updateItem}
        />
      </main>
    </div>
  );
}
