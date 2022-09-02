import { configureStore } from '@reduxjs/toolkit';
import answeredWordsReducer from './reducers/answeredWordsReducer';
import changeDifficulty from './reducers/difficultyReducer';
import userLogin from './reducers/loginReducer';
import pageReducer from './reducers/pageReducer';
import selectGameReducer from './reducers/selectGameReducer';
import startGameFrom from './reducers/startGameFromReducer';
import wordsReducer from './reducers/wordsReducer';

import rslangApi from './rslang/rslang.api';


export const store = configureStore({
    reducer: {
        [rslangApi.reducerPath]: rslangApi.reducer,
        gameDifficulty: changeDifficulty,
        selectedGame: selectGameReducer,
        currentWords: wordsReducer,
        currentPage: pageReducer,
        answeredWords: answeredWordsReducer,
        userLogin,
        startGameFrom
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
