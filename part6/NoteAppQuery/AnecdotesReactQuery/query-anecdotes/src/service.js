import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const res = await axios.get(baseUrl)
  return res.data;
}

export const createAnecdote = async (content) => {
  const newAnecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, newAnecdote);
  return response.data;
}

export const voteAnecdote = async (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote);
    return response.data;
    }