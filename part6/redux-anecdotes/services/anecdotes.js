import axios from "axios";
import { getId } from "../src/reducers/anecdoteReducer";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
    };

export const createNew = async (content) => {
    const object = { content, votes: 0, id: getId(), filter: '' };
    const response = await axios.post(baseUrl, object);
    return response.data;
    };

export const updateVotes = async (id) => {
    const anecdote = await axios.get(`${baseUrl}/${id}`);
    const updatedAnecdote = { ...anecdote.data, votes: anecdote.data.votes + 1 };
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote);
    return response.data
};

