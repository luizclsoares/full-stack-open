const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.payload;
    default:
      return state;
  }
};

export const filterAnecdote = (anecdote) => {
  return {
    type: "SET_FILTER",
    payload: anecdote,
  };
};

export default filterReducer;
