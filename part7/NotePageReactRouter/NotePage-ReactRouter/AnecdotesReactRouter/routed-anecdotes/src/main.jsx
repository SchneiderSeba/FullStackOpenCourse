
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateNew } from './CreateAnecdote'
import { Anecdote } from './Anecdote'
import { About } from './About'
import { Footer } from './Footer'
import App from './App'

const anecdotes = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]

const router = createBrowserRouter([
    {
        path: '/*',
        element: <App anecdotes={anecdotes} />
    },
    // {
    //     path: '/anecdote/:id',
    //     element: <Anecdote anecdote={anecdotes} />
    // },
    // {
    //     path: '/create',
    //     element: <CreateNew />
    // },
    // {
    //     path: '/about',
    //     element: <About />
    // },
    // {
    //     path: 'footer',
    //     element: <Footer />
    // }

])

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)