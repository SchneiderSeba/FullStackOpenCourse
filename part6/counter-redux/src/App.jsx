
import { useState } from 'react'
import { createStore } from 'redux'
import reactLogo from './assets/react.svg'
import './App.css'
import { NoteApp } from './noteApp.jsx'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

function App() {

  const [refresher, setRefresher] = useState()

  const reRender = () => setRefresher(!refresher)

  store.subscribe(reRender)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
      <div className="card">
        <button onClick={() => store.dispatch({ type: 'INCREMENT'})}>➕</button>
        <button onClick={() => store.dispatch({ type: 'DECREMENT'})}>➖</button>
        <button onClick={() => store.dispatch({ type: 'ZERO'})}>®️</button>
          
        <h1>{store.getState()}</h1>
      </div>

      <NoteApp />
    </>
  )
}

export default App
