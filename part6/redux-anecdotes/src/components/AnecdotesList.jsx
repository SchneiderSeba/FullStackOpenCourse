import { addVote } from '../reducers/anecdoteReducer.js'
import { useDispatch, useSelector } from 'react-redux'

export const AnecdotesList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
      }

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    return(
        filteredAnecdotes
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote => 
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote 👍🏼</button>
                  </div>
                </div>
            )
    )
}