import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from 'Utils/localStorage';
import answeredWordsReducer from './reducers/answeredWordsReducer';
import changeDifficulty from './reducers/difficultyReducer';
import userLogin from './reducers/loginReducer';
import pageSlice from './reducers/pageSlice';

import selectGameReducer from './reducers/selectGameReducer';
import startGameFrom from './reducers/startGameFromReducer';
import wordsReducer from './reducers/wordsReducer';

import rslangApi from './rslang/rslang.api';

const rootReducer = combineReducers({
    [rslangApi.reducerPath]: rslangApi.reducer,
    gameDifficulty: changeDifficulty,
    selectedGame: selectGameReducer,
    currentWords: wordsReducer,
    currentPage: pageSlice,
    answeredWords: answeredWordsReducer,
    userLogin,
    startGameFrom
});

const persistedStore = loadStateFromLocalStorage();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
    preloadedState: persistedStore,
});

store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
