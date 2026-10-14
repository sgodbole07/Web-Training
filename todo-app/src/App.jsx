import { useState } from 'react'
import TodoInput from './components/TodoInput'
import Filters from './components/Filters'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState('all')

  function addTodo(text) {
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    setTodos([...todos, newTodo])
  }

  function completeTodo(id) {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true }
      }
      return todo
    })
    setTodos(updated)
  }

  function updateTodo(id, text) {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: text }
      }
      return todo
    })
    setTodos(updated)
  }

  function deleteTodo(id) {
    const remaining = todos.filter((todo) => todo.id !== id)
    setTodos(remaining)
  }

  const completedTodos = todos.filter((todo) => todo.completed)
  const pendingTodos = todos.filter((todo) => !todo.completed)

  let visibleTodos = [...completedTodos, ...pendingTodos]
  if (filter === 'done') {
    visibleTodos = completedTodos
  }
  if (filter === 'todo') {
    visibleTodos = pendingTodos
  }

  return (
    <div className="app">
      <h2 className="heading">TodoInput</h2>
      <TodoInput onAdd={addTodo} />

      <h2 className="heading">TodoList</h2>
      {todos.length > 0 && <Filters filter={filter} onChange={setFilter} />}
      <TodoList
        todos={visibleTodos}
        onComplete={completeTodo}
        onUpdate={updateTodo}
        onDelete={deleteTodo}
      />
    </div>
  )
}

export default App
