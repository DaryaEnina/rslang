import { configureStore } from '@reduxjs/toolkit';
import changeDifficulty from './reducers/difficultyReducer';
import pageReducer from './reducers/pageReducer';
import selectGameReducer from './reducers/selectGameReducer';
import wordsReducer from './reducers/wordsReducer';

import rslangApi from './rslang/rslang.api';


export const store = configureStore({
    reducer: {
        [rslangApi.reducerPath]: rslangApi.reducer,
        gameDifficulty: changeDifficulty,
        selectedGame: selectGameReducer,
        currentWords: wordsReducer,
        currentPage: pageReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
