import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../service"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      alert('anecdote must be at least 5 characters long')
      return
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    console.log('create', content)  
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
