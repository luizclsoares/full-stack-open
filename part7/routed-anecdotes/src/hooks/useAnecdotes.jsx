import { useState, useEffect } from "react";
import anecdotesService from "../services/anecdotes";

const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  useEffect(() => {
    anecdotesService
      .getAll()
      .then((initialAnecdotes) => setAnecdotes(initialAnecdotes));
  }, []);

  return {
    anecdotes,
  };
};

export default useAnecdotes;
