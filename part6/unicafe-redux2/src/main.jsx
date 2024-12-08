import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { noteReducer, counterReducer, createNote } from './reducers/reducer.js'
import { filterReducer, filterChange } from './reducers/filterReducer.js'
import App from './App'

const rootReducer = combineReducers({
  counter: counterReducer,
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(rootReducer)

store.subscribe(() => console.log(store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)