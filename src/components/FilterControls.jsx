export default function FilterControls({
  filters,
  activeFilter,
  onChangeFilter,
  search,
  onSearchChange,
  stats,
  onClearCompleted,
}) {
  return (
    <div className="card filter-controls">
      <div className="filter-controls__row">
        <div className="filter-controls__buttons">
          {filters.map((name) => (
            <button
              key={name}
              type="button"
              className={`chip ${activeFilter === name ? "chip--active" : ""}`}
              onClick={() => onChangeFilter(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="filter-controls__stats">
          <span className="muted">
            {stats.completed} / {stats.total} completed
          </span>
          <button
            type="button"
            className="button button--ghost"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        </div>
      </div>

      <div className="filter-controls__search">
        <label htmlFor="search" className="card__label">
          Search tasks
        </label>
        <input
          id="search"
          className="input"
          placeholder="Find a task..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}
