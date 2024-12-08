import { addVote } from '../reducers/anecdoteReducer.js'
import { useDispatch } from 'react-redux'

export const AnecdotesList = ({ anecdotes }) => {

    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
      }

    return(
        anecdotes
            .slice()
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote => 
                <div key={anecdote.id}>
                  <div>
                    {anecdote.content}
                  </div>
                  <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                  </div>
                </div>
            )
    )
}