import { configureStore } from '@reduxjs/toolkit';
import gameDifficultyReducer from './reducers/difficultyReducer';
import selectGameReducer from './reducers/selectGameReducer';
import rslangApi from './rslang/rslang.api';



export const store = configureStore({
    reducer: {
        [rslangApi.reducerPath]: rslangApi.reducer,
        gameDifficulty: gameDifficultyReducer,
        selectedGame: selectGameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
