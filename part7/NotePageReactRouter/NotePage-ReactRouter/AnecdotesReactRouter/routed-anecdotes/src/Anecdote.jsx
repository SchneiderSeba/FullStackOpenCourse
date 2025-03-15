import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const Anecdote = ({ anecdotes}) => {
    const { id } = useParams()
    const anecdoteToShow = anecdotes.find(a => a.id === Number(id))

    if (!anecdoteToShow) {
        return <p>No anecdotes available</p>
    }

  return (
    <div className="ind-anecdote-container" style={{padding: '10px', border: '1px solid black', margin: '10px', backgroundColor: 'lightgray', overflowWrap: 'break-word', wordwrap: 'break-word', wordBreak: 'break-all'}}>
        <div>
            <h2>{anecdoteToShow.content} by {anecdoteToShow.author}</h2>
            <p>has {anecdoteToShow.votes} votes</p>
            <p>for more info see <a href={anecdoteToShow.info}>{anecdoteToShow.info}</a></p>
        </div>

        <Link to='/'>back</Link>
    </div>
  )
}