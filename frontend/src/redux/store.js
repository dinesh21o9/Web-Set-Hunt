import { configureStore } from '@reduxjs/toolkit';
import loaderReducer from './loaderReducer';
import authReducer from './authReducer';

export const store = configureStore({
    reducer: {
        loader: loaderReducer,
        authUser: authReducer,
    },
});