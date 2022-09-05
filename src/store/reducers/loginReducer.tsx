/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const token = '';
const userId = '';
const isLogin: boolean = false;

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
      state.userLogin = { isLogin: false, token: '', userId: '' }
    }
  }
})

export default userLoginSlice.reducer;
export const { userLoginReducer, setUnloginReducer } = userLoginSlice.actions;