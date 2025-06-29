import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sliceAnecdote = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    voteAnecdote(state = "", action) {
      const id = action.payload;

      const filteredAnecdote = state.find((anecdote) => anecdote.id === id);

      const anecdote = {
        ...filteredAnecdote,
        votes: filteredAnecdote.votes + 1,
      };

      return state.map((s) => (s.id !== id ? s : anecdote));
    },
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createAnecdote(content);

    dispatch(newAnecdote(anecdote));
  };
};

export const { voteAnecdote, newAnecdote, setAnecdotes } =
  sliceAnecdote.actions;

export default sliceAnecdote.reducer;
