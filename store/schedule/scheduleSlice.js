import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: {
    Sunday: {
      subjects: [],
      time: 0,
    },
    Monday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
    Tuesday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
    Wednesday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
    Thursday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
    Friday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
    Saturday: {
      subjects: [],
      time: 0,
      holiday: false,
    },
  },
  loading: "idle",
  error: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSubjectToDay: (state, action) => {
      state.records[action.payload.day].subjects.unshift({
        id: Math.random(),
        title: action.payload.title,
        isDone: false,
      });
    },
    removeSubjectFromDay: (state, action) => {
      state.records[action.payload.day].subjects = state.records[
        action.payload.day
      ].subjects.filter((subject) => {
        return subject.id !== action.payload.id;
      });
    },
  },
});
export const { addSubjectToDay, removeSubjectFromDay } = scheduleSlice.actions;
export default scheduleSlice.reducer;
