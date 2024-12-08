import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { noteReducer, counterReducer } from './reducers/reducer.js'
import App from './App'

const rootReducer = combineReducers({
  counter: counterReducer,
  notes: noteReducer
})

const store = createStore(rootReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)