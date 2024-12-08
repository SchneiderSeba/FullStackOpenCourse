import React from 'react'
import { useState } from 'react'
import { createStore } from 'redux'
import { counterReducer, noteReducer } from './reducer'
import ReactDOM from 'react-dom'


const store = createStore(counterReducer)
const noteStore = createStore(noteReducer)

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

const App = () => {

  const [refresh, setRefresh] = useState()

  const refreshPage = () => {
    setRefresh(!refresh)
  }

  store.subscribe(refreshPage)
  noteStore.subscribe(refreshPage)

  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    noteStore.dispatch({
      type: 'NEW_NOTE',
      payload: {
        content,
        important: false,
        id: generateId()
      }
    })
  }

  const toggleImportance = (id) => {
    noteStore.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      payload: { id }
    })
  }

  return (
    <>
      <div>
        <button onClick={good}>good</button>
        <button onClick={ok}>ok</button>
        <button onClick={bad}>bad</button>
        <button onClick={zero}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
      <div>
          <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
          </form>
          <ul>
            {noteStore.getState().map(note => <li
              key={note.id}
              
            >
              {note.content} <strong>{note.important ? 'important' : ''}</strong>
              <button onClick={() => toggleImportance(note.id)}>toggle</button>
            </li>
            )}
          </ul>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export default App