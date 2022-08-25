/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const selectGameSlice = createSlice({
  name: 'selectedGame',
  initialState: {
    selectedGame: localStorage.getItem('selectedGame') || 'AUDIOGAME'
  },
  reducers: {
    selectAudiogame(state) {
      state.selectedGame = 'AUDIOGAME';
    },
    selectSprint(state) {
      state.selectedGame = 'SPRINT';
    }
  }
})

export default selectGameSlice.reducer;
export const { selectAudiogame, selectSprint } = selectGameSlice.actions;