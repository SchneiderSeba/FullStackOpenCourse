
import { Link } from "react-router-dom";

export const AnecdoteList = ({ anecdotes }) => {
  if (!anecdotes) {
    return <p>No anecdotes available</p>;
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => 
          <li key={anecdote.id}>
            {/* <Anecdote anecdote={anecdote} />  */}
            <Link to={`/anecdote/${anecdote.id}`}>
              {anecdote.content}
            </Link>
          </li>
        )}
      </ul>

      <Link to='/'>back</Link>
    </div>
  );
};