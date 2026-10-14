function Filters({ filter, onChange }) {
  function getClass(name) {
    if (filter === name) {
      return 'filter-button selected'
    }
    return 'filter-button'
  }

  return (
    <div className="filters">
      <button className={getClass('all')} onClick={() => onChange('all')}>
        All
      </button>
      <button className={getClass('done')} onClick={() => onChange('done')}>
        Done
      </button>
      <button className={getClass('todo')} onClick={() => onChange('todo')}>
        Todo
      </button>
    </div>
  )
}

export default Filters
