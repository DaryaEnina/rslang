import { createSlice } from "@reduxjs/toolkit";

const changeDifficultySlice =  createSlice({
  name: "changeDifficulty",
  initialState: {
    changeDifficulty: localStorage.getItem('gameDifficulty') || 'A1'
  },
  reducers: {
    changeDifficultyReducer(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.changeDifficulty = action.payload;
    }
  }
})

export default changeDifficultySlice.reducer;
export const { changeDifficultyReducer } = changeDifficultySlice.actions;