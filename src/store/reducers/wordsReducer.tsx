/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";


const wordsSlice = createSlice({
  name: 'currentWords',
  initialState: {
    currentWords: []
  },
  reducers: {
    setWordsReducer(state, action) {
      state.currentWords = action.payload;
    }
  }
})

export default wordsSlice.reducer;
export const { setWordsReducer } = wordsSlice.actions;