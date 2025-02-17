import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, voteAnecdote } from './service'

const App = () => {

  const queryClient = useQueryClient()

  const [votes, setVotes] = useState(0)

  // const newAnecdoteMutation = useMutation({ 
  //   mutationFn: createAnecdote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('anecdotes')
  //   } 
  // })
  const voteMutation = useMutation({ 
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }})

  const { data, error, isLoading } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  console.log(data) 

  const handleVote = (anecdote) => {
    console.log(`vote for, ${anecdote.content}`)
    voteMutation.mutate(anecdote)
  }

  const handleCreate = (content) => {
    console.log(`create, ${content}`)
  }

  if (isLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>anecdote service not available due to problems in server</p>
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {Array.isArray(data) ? data.map(anecdote => (
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )) : <p>No data available</p>}

    </div>
  )
}

export default App
