import { configureStore } from '@reduxjs/toolkit';
import rslangApi from './rslang/rslang.api';

const store = configureStore({
    reducer: {
        [rslangApi.reducerPath]: rslangApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rslangApi.middleware),
});

export default store;
