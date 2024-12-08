import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, addVote } from './reducers/anecdoteReducer.js'
import { createStore } from 'redux'
import { useState } from 'react'
import { reducer } from './reducers/anecdoteReducer.js'

const store = createStore(reducer)

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const [refresh, setRefresh] = useState(false)

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
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
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submite'>create➕</button>
      </form>
    </div>
  )
}

export default App