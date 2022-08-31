import { createSlice } from "@reduxjs/toolkit";

const isLogin = !!(localStorage.getItem('token') && localStorage.getItem('userId'));

const userLoginSlice =  createSlice({
  name: "userLogin",
  initialState: {
    userLogin: isLogin
  },
  reducers: {
    userLoginReducer(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.userLogin = action.payload;
    }
  }
})

export default userLoginSlice.reducer;
export const { userLoginReducer } = userLoginSlice.actions;