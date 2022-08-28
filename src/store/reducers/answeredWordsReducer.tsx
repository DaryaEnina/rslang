/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AnsweredWord } from "Pages/Games/Audiogame/Audiogame";

const initial: AnsweredWord[] = [];

const answeredWordsSlice = createSlice({
  name: 'answeredWords',
  initialState: {
    answeredWords: initial
  },
  reducers: {
    setAnsweredWordsReducer(state, action: { payload: AnsweredWord, type: string}) {
      state.answeredWords.push(action.payload);
    },
    clearAnsweredWordsReducer(state) {
      state.answeredWords = [];
    }
  }
})

export default answeredWordsSlice.reducer;
export const { setAnsweredWordsReducer, clearAnsweredWordsReducer } = answeredWordsSlice.actions;