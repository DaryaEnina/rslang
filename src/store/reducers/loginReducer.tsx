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
      // eslint-disable-next-line no-param-reassign
      state.userLogin = action.payload;
    }
  }
})

export default userLoginSlice.reducer;
export const { userLoginReducer } = userLoginSlice.actions;