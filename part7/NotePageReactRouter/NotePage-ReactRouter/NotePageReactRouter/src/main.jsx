import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProfilePage } from './ProfilePage.jsx'
import { ProfilesPage } from './ProfilesPage.jsx'
import { NotFound } from './404.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    errorElement: <NotFound />
  },
  {
    path: '/profiles',
    element: <ProfilesPage />,
    errorElement: <NotFound />
  },
  {
    path: '/profile/:id',
    element: <ProfilePage />,
    errorElement: <NotFound />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
