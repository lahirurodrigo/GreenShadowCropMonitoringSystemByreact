import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Log {
    logCode: string;
    logDate: string;
    logDetails: string;
    staffId: string;
    fieldCode: string;
    cropCode: string;
    observedImage: File | null;
}

export interface Staff {
    id: string;
    name: string;
}

interface LogState {
    list: Log[];
    staff: Staff[];
}

const initialState: LogState = {
    list: [],
    staff: [],
};

const logSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        addLog: (state, action: PayloadAction<Log>) => {
            state.list.push(action.payload);
        },
        deleteLog: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((log) => log.logCode !== action.payload);
        },
        updateLog: (state, action: PayloadAction<Log>) => {
            const index = state.list.findIndex((log) => log.logCode === action.payload.logCode);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
});

export const { addLog, deleteLog, updateLog } = logSlice.actions;
export default logSlice.reducer;
