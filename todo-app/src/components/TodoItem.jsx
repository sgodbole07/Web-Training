import { useState } from 'react'

function TodoItem({ todo, onComplete, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  function startEdit() {
    setEditText(todo.text)
    setIsEditing(true)
  }

  function cancelEdit() {
    setEditText(todo.text)
    setIsEditing(false)
  }

  function confirmEdit() {
    onUpdate(todo.id, editText)
    setIsEditing(false)
  }

  function handleDelete() {
    const sure = window.confirm('Are you sure you want to delete this todo?')
    if (sure) {
      onDelete(todo.id)
    }
  }

  if (isEditing) {
    return (
      <div className="todo-item">
        <input
          className="edit-field"
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <div className="actions">
          <button className="cancel-button" onClick={cancelEdit}>
            Cancel
          </button>
          <button className="confirm-button" onClick={confirmEdit}>
            Confirm
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="todo-item">
      <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
        {todo.text}
      </span>
      <div className="actions">
        <input
          className="checkbox"
          type="checkbox"
          checked={todo.completed}
          disabled={todo.completed}
          onChange={() => onComplete(todo.id)}
        />
        {!todo.completed && (
          <button className="edit-button" onClick={startEdit}>
            Edit
          </button>
        )}
        {todo.completed && (
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default TodoItem
