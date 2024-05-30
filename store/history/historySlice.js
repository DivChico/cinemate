import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: {},
  loading: "idle",
  error: null,
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      state.history[action.payload.date] = {
        ...action.payload.subjectsAndTime,
      };
      console.log("******", state.history[action.payload.date]);
    },
    changeTime: (state, action) => {
      console.log(action.payload.time);
      state.history[action.payload.date].time = action.payload.time;
      console.log("new time ", state.history[action.payload.date].time);
    },
  },
});
export const { addToHistory, changeTime } = historySlice.actions;
export default historySlice.reducer;
