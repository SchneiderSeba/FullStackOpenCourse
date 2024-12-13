import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { anecdoteReducer } from './reducers/anecdoteReducer.js'
import { createStore } from 'redux'

const store = createStore(anecdoteReducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)