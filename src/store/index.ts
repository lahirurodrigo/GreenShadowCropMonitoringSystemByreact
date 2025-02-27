import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice.ts"
import userReducer from "../reducers/userSlice.ts"
import fieldReducer from "../reducers/fieldSlice.ts"


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        fields: fieldReducer,
    },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;