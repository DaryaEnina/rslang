/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IPageState {
    currentPage: number;
}

const initialState: IPageState = {
    currentPage: 0,
};

const pageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setPageReducer(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
    },
});

export default pageSlice.reducer;
export const { setPageReducer } = pageSlice.actions;
