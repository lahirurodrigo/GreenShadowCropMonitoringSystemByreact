import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice.ts"


export const store = configureStore({
    reducer: {
            auth: authReducer, // Must match useSelector key
    },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;