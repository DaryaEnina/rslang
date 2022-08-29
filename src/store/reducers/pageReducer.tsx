/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";


const pageSlice = createSlice({
  name: 'currentPage',
  initialState: {
    currentPage: 0
  },
  reducers: {
    setPageReducer(state, action) {
      state.currentPage = action.payload;
    }
  }
})

export default pageSlice.reducer;
export const { setPageReducer } = pageSlice.actions;