import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './service'
import { NotiContextProvider, useNotiContext } from './components/NotificationContex'

const App = () => {

  const queryClient = useQueryClient()
  const { notificationDispatch } = useNotiContext()

  const voteMutation = useMutation({ 
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({ type: 'VOTE_NOTIFICATION', notification: `You voted for : ${updatedAnecdote.content}` })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 2000)
    }
  })

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

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
  // if (error) {
  //   return <p>anecdote service not available due to problems in server</p>
  // }

  return (
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {Array.isArray(data) ? data.map(anecdote => (
          <div key={anecdote.id} style={{ marginBottom: '10px', marginTop: '10px' }}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)} style={{ marginLeft: "10px"}}>vote</button>
            </div>
          </div>
        )) : <p>No data available</p>}

      </div>
  )
}

export default App
