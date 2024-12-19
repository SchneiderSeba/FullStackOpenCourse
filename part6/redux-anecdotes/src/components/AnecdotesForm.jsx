import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addNotification } from '../reducers/notificationReducer'

export const AnecdotesForm = () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(addNotification(`You Added : ${content}`))
    }
    return (
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">add ➕</button>
        </form>
    )
}