/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Footer } from './Footer'
import { AnecdoteList } from './Anecdotes'
import { Link } from 'react-router-dom'
        
const Menu = () => {
  const padding = {
    paddingRight: 5                        
  }
  return (       
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}

const App = ({ anecdotes }) => {

  const [anecdotesState, setAnecdotes] = useState(anecdotes)

  const [notification, setNotification] = useState('')

  const addNew = (anecdotesState) => {
    anecdotesState.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotesState.concat(anecdotesState))
  }

  const anecdoteById = (id) =>
    anecdotesState.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotesState.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <AnecdoteList anecdotes={anecdotesState} />
      {/* <About /> */}
      {/* <CreateNew addNew={addNew} /> */}
      <Footer />
    </div>
  )
}

export default App
