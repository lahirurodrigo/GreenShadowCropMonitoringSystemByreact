import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice.ts";
import userReducer from "../reducers/userSlice.ts";
import fieldReducer from "../reducers/fieldSlice.ts";
import cropReducer from "../reducers/cropSlice.ts";
import staffReducer from "../reducers/staffSlice.ts";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        fields: fieldReducer,
        crops: cropReducer,
        staff: staffReducer,
    },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create a typed dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;