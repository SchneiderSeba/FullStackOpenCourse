// import { addVote } from '../reducers/anecdoteReducer.js'
// import { voteNotification } from '../reducers/notificationReducer.js'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from './Notification.jsx'
import { updateVotes } from '../reducers/anecdoteReducer.js'
import { showNotification } from '../reducers/notificationReducer.js'

export const AnecdotesList = () => {

    const dispatch = useDispatch()
    const { anecdotes, filter } = useSelector(state => state.anecdotes)
    // const filter = useSelector(state => state.anecdotes.filter)
    const notification = useSelector(state => state.notification)

    const vote = (anecdote) => {
        console.log('vote', anecdote)
        // dispatch(addVote(anecdote.id))
        dispatch(updateVotes(anecdote.id))
        dispatch(showNotification(`You Voted : ${anecdote.content}`, 10))
      }

    // const filteredAnecdotes = anecdotes.filter(anecdote =>
    //   anecdote.content.toLowerCase().includes(filter.toLowerCase())
    // )
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content && anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    return(
      <>
        { notification && <Notification />}
        <section>
          <h2>Anecdotes</h2>
          {filteredAnecdotes
              .slice()
              .sort((a, b) => b.votes - a.votes)
              .map(anecdote => 
                  <div key={anecdote.id}>
                    <div>
                      {anecdote.content}
                    </div>
                    <div>
                      has {anecdote.votes}
                      <button onClick={() => vote(anecdote)}>vote 👍🏼</button>
                    </div>
                  </div>
              )
            }
        </section>
      </>
    )
}