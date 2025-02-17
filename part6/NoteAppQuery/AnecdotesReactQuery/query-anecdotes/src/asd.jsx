import React from "react";

export const Anecdote = ({ anecdote, handleVote }) => {
    return (
        <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
        </div>
    );
};