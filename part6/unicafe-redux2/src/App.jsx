import { useState } from 'react'
import { createStore } from 'redux' // <-- Añadir createStore
import { counterReducer, toggleImportanceOf, createNote, noteSlice } from './reducers/reducer.js'
import { NewNote } from './components/NewNote.jsx'
import { Notes } from './components/Notes.jsx'

const store = createStore(counterReducer)
// const noteStore = createStore(noteReducer)

const App = () => {

    const [refresh, setRefresh] = useState()
  
    const refreshPage = () => {
      setRefresh(!refresh)
    }
  
    store.subscribe(refreshPage)
    // noteStore.subscribe(refreshPage)
  
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
  
    return (
      <>
        <div>
          <button onClick={good}>good 🔥</button>
          <button onClick={ok}>ok 👍🏼</button>
          <button onClick={bad}>bad 👎🏼</button>
          <button onClick={zero}>reset stats</button>
          <div>good {store.getState().good}</div>
          <div>ok {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
        </div>

        {/* <NewNote store={createNote} />
        <Notes store={createNote} toggleImportanceOf={toggleImportanceOf} /> */}
        <NewNote />
        <Notes />

      </>
    )
  }

  export default App