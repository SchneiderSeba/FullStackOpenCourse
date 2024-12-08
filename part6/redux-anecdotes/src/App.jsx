import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote } from './reducers/anecdoteReducer.js'
import { createStore } from 'redux'
import { useState } from 'react'
import { reducer } from './reducers/anecdoteReducer.js'
import { AnecdotesList } from './components/AnecdotesList.jsx'

const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState(false)

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  store.subscribe(refreshPage)
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdotesList anecdotes={anecdotes} />
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submite'>create➕</button>
      </form>
    </div>
  )
}

export default App