import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define Auth State
interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("authToken"), // Check if token exists in localStorage
    loading: false,
    error: null,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (
        { username, password }: { username: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { username, password });

            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            // Store both tokens in localStorage
            localStorage.setItem("authToken", accessToken);  // Store access token
            localStorage.setItem("refreshToken", refreshToken);  // Store refresh token

            return { accessToken, refreshToken }; // Return both tokens
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Something went wrong");
        }
    }
);

// Create Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("authToken"); // Remove token on logout
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions; // Export the logout action
export default authSlice.reducer;
