import { useDispatch, useSelector } from 'react-redux'
import { createStore } from 'redux'
import { useState, useEffect } from 'react'
// import { anecdoteReducer } from './reducers/anecdoteReducer.js'
import { anecdoteSlice } from './reducers/anecdoteReducer.js'
import { AnecdotesList } from './components/AnecdotesList.jsx'
import { AnecdotesForm } from './components/AnecdotesForm.jsx'
import { Filter } from './components/filter.jsx'
import { getAll } from '../services/anecdotes'

const store = createStore(anecdoteSlice.reducer)

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes)

  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then(anecdotes =>
      dispatch(anecdoteSlice.actions.setAnecdotes(anecdotes))
    )
  }, [dispatch])

  const [refresh, setRefresh] = useState(false)

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  store.subscribe(refreshPage)
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdotesList anecdotes={anecdotes}/>
      <h2>Create New</h2>
      <AnecdotesForm />
    </div>
  )
}

export default App