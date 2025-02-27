import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Staff {
    staffId: string;
    firstName: string;
    lastName: string;
    designation: string;
    gender: "MALE" | "FEMALE";
    role: "MANAGER" | "EMPLOYEE" | "ADMINISTRATIVE" | "SCIENTIST";
    joinDate: string;
    dateOfBirth: string;
    contactNo: string;
    email: string;
    address: string;
}

interface StaffState {
    list: Staff[];
}

const initialState: StaffState = {
    list: [],
};

export const staffSlice = createSlice({
    name: "staff",
    initialState,
    reducers: {
        addStaff: (state, action: PayloadAction<Staff>) => {
            state.list.push(action.payload);
        },
        deleteStaff: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter(staff => staff.staffId !== action.payload);
        },
        updateStaff: (state, action: PayloadAction<Staff>) => {
            const index = state.list.findIndex(staff => staff.staffId === action.payload.staffId);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        }
    }
});

export const { addStaff, deleteStaff, updateStaff } = staffSlice.actions;
export default staffSlice.reducer;