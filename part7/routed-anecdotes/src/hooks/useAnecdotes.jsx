import { useState, useEffect } from "react";
import anecdotesService from "../services/anecdotes";

const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((initialAnecdotes) => setAnecdotes(initialAnecdotes));
  }, []);

  const addAnecdote = async (anecdote) => {
    const newAnecdote = await anecdotesService.createNew(anecdote);

    setAnecdotes(anecdotes.concat(newAnecdote));
  };

  return {
    anecdotes,
    addAnecdote,
  };
};

export default useAnecdotes;
