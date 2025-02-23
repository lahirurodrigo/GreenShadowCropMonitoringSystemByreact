import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define Auth State
interface AuthState {
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

// Initial State
const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem("authToken"), // Check storage
    loading: false,
    error: null,
};

// Async Thunk for Login
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            // Mock user credentials (Replace with API call later)
            const mockUser = { username: "admin", password: "1234" };

            if (username !== mockUser.username || password !== mockUser.password) {
                throw new Error("Invalid credentials");
            }

            // Mock token (replace this when you have an actual API)
            const mockToken = "mock-token-123";
            localStorage.setItem("authToken", mockToken); // Store token

            return mockToken;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Create Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("authToken");
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

// ✅ Ensure `logout` is properly exported
export const { logout } = authSlice.actions;
export default authSlice.reducer;

