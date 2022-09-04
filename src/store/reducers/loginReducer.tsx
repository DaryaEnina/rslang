/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const isLogin = !!(token && userId);

const userLoginSlice =  createSlice({
  name: "userLogin",
  initialState: {
    userLogin: { isLogin, token, userId }
  },
  reducers: {
    userLoginReducer(state, action) {
      state.userLogin = action.payload;
    },
    setUnloginReducer(state) {
      state.userLogin = { isLogin: false, token: null, userId: null }
    }
  }
})

export default userLoginSlice.reducer;
export const { userLoginReducer, setUnloginReducer } = userLoginSlice.actions;