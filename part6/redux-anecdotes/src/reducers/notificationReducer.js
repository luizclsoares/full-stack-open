import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(initialState, action) {
      return action.payload;
    },
    removeNotification(initialState, action) {
      return null;
    },
  },
});

export const setNotification = (message, time) => {
  return (dispatch) => {
    dispatch(createNotification(message));

    setTimeout(() => {
      dispatch(removeNotification());
    }, time * 1000);
  };
};

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
