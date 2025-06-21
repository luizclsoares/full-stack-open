import { createSlice } from "@reduxjs/toolkit";

const sliceFilter = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterAnecdote(state = "", action) {
      return action.payload;
    },
  },
});

export const { filterAnecdote } = sliceFilter.actions;

export default sliceFilter.reducer;
