import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadStateFromLocalStorage, saveStateToLocalStorage } from 'Utils/localStorage';
import answeredWordsReducer from './reducers/answeredWordsReducer';
import changeDifficulty from './reducers/difficultyReducer';
import { userLoginReducer } from './reducers/loginReducer';
import pageReducer from './reducers/pageSlice';
import selectGameReducer from './reducers/selectGameReducer';
import wordsReducer from './reducers/wordsReducer';

import rslangApi from './rslang/rslang.api';

const rootReducer = combineReducers({
    [rslangApi.reducerPath]: rslangApi.reducer,
    gameDifficulty: changeDifficulty,
    selectedGame: selectGameReducer,
    currentWords: wordsReducer,
    currentPage: pageReducer,
    answeredWords: answeredWordsReducer,
    userLogin: userLoginReducer,
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
