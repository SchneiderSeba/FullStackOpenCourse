import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'
import { createNew } from '../../services/anecdotes'

export const AnecdotesForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // dispatch(createAnecdote(content))
        const newAnecdote = await createNew(content) 
        dispatch(createAnecdote(newAnecdote))
        dispatch(addNotification(`You Added : ${content}`))
    }
    return (
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">add ➕</button>
        </form>
    )
}