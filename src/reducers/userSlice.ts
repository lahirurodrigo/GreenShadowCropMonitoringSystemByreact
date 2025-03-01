import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export type User = {
    username: string;
    password: string;
    role: "STAFF" | "ADMIN" | "USER";
};

type UserState = User[];

const initialState: UserState = [];

export const addUser = createAsyncThunk(
    "users/addUser",
    async (user: User, { rejectWithValue }) => {
        try {
            const role = "ADMIN"
            const { username, password } = user;

            console.log(username)

            const response = await axios.post("http://localhost:5000/api/auth/register", { username, password, role });
            return response.data;  // Assuming the server returns the added user
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || "Failed to add user");
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        deleteUser: (state, action: PayloadAction<string>) => {
            return state.filter(user => user.username !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addUser.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(addUser.rejected, (state, action) => {
                state.push();
                console.error("Failed to add user:", action.payload,);
            });
    },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
