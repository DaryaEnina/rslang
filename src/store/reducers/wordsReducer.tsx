/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { WordsResponse } from "models/models";

const initial: WordsResponse = [];

const wordsSlice = createSlice({
  name: 'currentWords',
  initialState: {
    currentWords: initial
  },
  reducers: {
    setWordsReducer(state, action) {
      state.currentWords = action.payload;
    }
  }
})

export default wordsSlice.reducer;
export const { setWordsReducer } = wordsSlice.actions;