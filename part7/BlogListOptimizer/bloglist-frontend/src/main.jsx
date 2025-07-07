import ReactDOM from 'react-dom/client'
import App from './App'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import notificationReducer from './Slices/NotificationSlice.jsx'
import createBlogReducer from './Slices/CreateBlogSlice.jsx'
import loginSlice from './Slices/loginSlice.jsx'
import { BrowserRouter } from 'react-router'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    createNewBlog: createBlogReducer,
    login: loginSlice,
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
