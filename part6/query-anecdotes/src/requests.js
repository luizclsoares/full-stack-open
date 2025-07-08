import axios from "axios";

const url = "http://localhost:3001/anecdotes";

export const getAll = () => axios.get(url).then((res) => res.data);

export const createAnecdote = (anecdote) =>
  axios.post(url, anecdote).then((res) => res.data);
