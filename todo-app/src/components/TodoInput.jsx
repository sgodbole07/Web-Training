import { useState } from 'react'

function TodoInput({ onAdd }) {
  const [text, setText] = useState('')

  function handleAdd() {
    onAdd(text)
    setText('')
  }

  return (
    <div className="input-box">
      <div className="input-row">
        <span className="input-icon">📖</span>
        <input
          className="input-field"
          type="text"
          placeholder="New Todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <button className="add-button" onClick={handleAdd}>
        Add new task
      </button>
    </div>
  )
}

export default TodoInput
