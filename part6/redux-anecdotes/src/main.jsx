import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
// import { anecdoteReducer } from './reducers/anecdoteReducer.js'
// import { createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { anecdoteSlice } from './reducers/anecdoteReducer.js'
import { notificationSlice } from './reducers/notificationReducer.js'

// const store = createStore(anecdoteReducer)

const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice.reducer,
    notification: notificationSlice.reducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)