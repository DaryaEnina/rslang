import { createSlice } from "@reduxjs/toolkit";
import { AllDifficulties } from "models/models";

const initial = (localStorage.getItem('gameDifficulty') as AllDifficulties) || 'A1';

const changeDifficultySlice = createSlice({
  name: "changeDifficulty",
  initialState: {
    changeDifficulty: initial
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