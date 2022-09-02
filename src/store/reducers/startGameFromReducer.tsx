/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initial: string = '';

const startGameFromSlice = createSlice({
  name: 'startGameFrom',
  initialState: {
    startGameFrom: initial
  },
  reducers: {
    startGameFromReducer(state, action) {
      state.startGameFrom = action.payload;
    }
  }
})

export default startGameFromSlice.reducer;
export const { startGameFromReducer } = startGameFromSlice.actions;