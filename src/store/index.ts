import { configureStore } from '@reduxjs/toolkit';
import changeDifficulty from './reducers/difficultyReducer';


import rslangApi from './rslang/rslang.api';


export const store = configureStore({
    reducer: {
        [rslangApi.reducerPath]: rslangApi.reducer,
        gameDifficulty: changeDifficulty,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
