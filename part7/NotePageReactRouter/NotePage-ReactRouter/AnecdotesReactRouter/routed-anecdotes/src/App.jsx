/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Footer } from './Footer'
import { AnecdoteList } from './Anecdotes'
import { Anecdote } from './Anecdote'
import { CreateNew } from './CreateAnecdote'
import { About } from './About'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotesState.concat(anecdote))
    setNotification(`A new anecdote '${anecdote.content}' created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
    navigate('/')
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
      {notification && <div style={{ backgroundColor: 'green'}}>{notification}</div>}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotesState} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path='/about' element={<About />} />
        <Route path='/anecdote/:id' element={<Anecdote anecdotes={anecdotesState} vote={vote} />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
