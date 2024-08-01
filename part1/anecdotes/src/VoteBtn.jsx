/* eslint-disable react/prop-types */


export function VoteBtn ({ setVotes, selected, votes}) {


    const handleVote = () => {
        const newVotes = [... votes]
        newVotes[selected] += 1
        setVotes( newVotes )
    }



    return(
        <button onClick={handleVote}>Vote</button>
    )
}