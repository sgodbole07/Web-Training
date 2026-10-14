import TodoItem from './TodoItem'

function TodoList({ todos, onComplete, onUpdate, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty-message">No todo is available</p>
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onComplete={onComplete}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TodoList
