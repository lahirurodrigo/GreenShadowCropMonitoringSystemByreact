import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    email: string;
    password: string;
    role: "MANAGER" | "ADMIN" | "SCIENTIST";
};

type UserState = User[];

const initialState: UserState = [];

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            return state.filter(user => user.email !== action.payload);
        },
    },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;