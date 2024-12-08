import { useSelector } from 'react-redux'
import { createStore } from 'redux'
import { useState } from 'react'
import { reducer } from './reducers/anecdoteReducer.js'
import { AnecdotesList } from './components/AnecdotesList.jsx'
import { AnecdotesForm } from './components/AnecdotesForm.jsx'
import { Filter } from './components/filter.jsx'

const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  const [refresh, setRefresh] = useState(false)

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  store.subscribe(refreshPage)
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList anecdotes={anecdotes} />
      <h2>create new</h2>
      <AnecdotesForm />
    </div>
  )
}

export default App