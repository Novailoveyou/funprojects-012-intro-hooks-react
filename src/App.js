import { useState } from 'react'
import './App.css'

const Todo = ({ todo, index, completeTodo, removeTodo }) => {
  return (
    <div
      style={{ textDecoration: todo.isCompleted ? 'line-through' : '' }}
      className='todo'>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>
          {todo.isCompleted ? 'Uncomplete' : 'Complete'}
        </button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  )
}

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    if (!value) return
    addTodo(value)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={value}
        placeholder='Add Todo...'
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

const App = () => {
  const [todos, setTodos] = useState([
    {
      text: 'Learn about React',
      isCompleted: false
    },
    {
      text: 'Meet friend for lunch',
      isCompleted: false
    },
    {
      text: 'Build really cool todo app',
      isCompleted: false
    }
  ])

  const addTodo = text => {
    const newTodos = [...todos, { text }]
    setTodos(newTodos)
  }

  const completeTodo = index => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
  }

  const removeTodo = index => {
    const newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  return (
    <div className='app'>
      <div className='todoList'>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  )
}

export default App
