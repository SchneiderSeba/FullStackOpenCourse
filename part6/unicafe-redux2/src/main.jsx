import React from 'react'
import ReactDOM from 'react-dom/client'
// import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { counterReducer, noteSlice, setNote } from './reducers/reducer.js'
import { filterReducer } from './reducers/filterReducer.js'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { appendNotes } from './reducers/reducer.js'
import { getAll } from './services/notes.js'

// const rootReducer = combineReducers({
//   counter: counterReducer,
//   notes: noteReducer,
//   filter: filterReducer
// })

// const store = createStore(rootReducer)
const store = configureStore({
  reducer: {
    notes: noteSlice.reducer,
    filter: filterReducer,
    counter: counterReducer
  }
})

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(filterChange('IMPORTANT'))
// store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

getAll().then(notes =>
  notes.forEach(note => {
    store.dispatch(setNote(notes))
    }
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)