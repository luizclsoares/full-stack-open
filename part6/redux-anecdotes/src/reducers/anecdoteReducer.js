import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const sliceAnecdote = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
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

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    const updatedAnecdote = await anecdoteService.voteAnecdote(newAnecdote);

    const anecdotes = await anecdoteService.getAll();

    dispatch(
      setAnecdotes(
        anecdotes.map((anecdote) =>
          anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
        )
      )
    );
  };
};

export const { newAnecdote, setAnecdotes } = sliceAnecdote.actions;

export default sliceAnecdote.reducer;
