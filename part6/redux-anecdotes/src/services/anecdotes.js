import axios from "axios";

const url = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(url);
  return response.data;
};

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };

  const response = await axios.post(url, anecdote);
  return response.data;
};

const voteAnecdote = async (anecdote) => {
  const response = await axios.put(`${url}/${anecdote.id}`, anecdote);
  return response.data;
};

export default { getAll, createAnecdote, voteAnecdote };
