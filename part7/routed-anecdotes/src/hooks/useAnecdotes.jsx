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

  const deleteAnecdote = async (anecdote) => {
    const confirm = window.confirm(`Delete anecdote ${anecdote.content} ?`);

    if (confirm) {
      await anecdotesService.deleteAnecdote(anecdote.id);

      setAnecdotes(anecdotes.filter((a) => a.id !== anecdote.id));
    }
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};

export default useAnecdotes;
