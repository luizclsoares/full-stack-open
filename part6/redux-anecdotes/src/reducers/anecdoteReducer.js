import { createSlice } from "@reduxjs/toolkit";

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

export const { voteAnecdote, newAnecdote, setAnecdotes } =
  sliceAnecdote.actions;

export default sliceAnecdote.reducer;
