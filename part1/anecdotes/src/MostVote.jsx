/* eslint-disable react/prop-types */

 
 
 export function MostVote ({ votes, anecdotes }) {

    const getMostVoted = () => {

        const maxVoted = Math.max(...votes)
        const maxIndex = votes.indexOf(maxVoted)
        return { anecdote: anecdotes[maxIndex], vote: maxVoted}

    }

    const { anecdote, vote: mostVoted } = getMostVoted()
    

    return(
        <div>
            <h2>Anecdote with most votes</h2>
            {mostVoted > 0 ? (<p>{anecdote}</p>) : null}
        </div>
    )
 }