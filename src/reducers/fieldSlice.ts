import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Field {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: number;
    cropCode: string;
    images: File[];
}

export interface Crop {
    id: string;
    name: string;
}

interface FieldState {
    list: Field[];
    crops: Crop[];
}

const initialState: FieldState = {
    list: [],
    crops: [],
};

// Fetch crops asynchronously
export const fetchCrops = createAsyncThunk("fields/fetchCrops", async () => {
    const response = await fetch("/api/crops");
    return (await response.json()) as Crop[];
});

const fieldSlice = createSlice({
    name: "fields",
    initialState,
    reducers: {
        addField: (state, action: PayloadAction<Field>) => {
            state.list.push(action.payload);
        },
        deleteField: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((field) => field.fieldCode !== action.payload);
        },
        updateField: (state, action: PayloadAction<Field>) => {
            const index = state.list.findIndex((field) => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCrops.fulfilled, (state, action) => {
            state.crops = action.payload;
        });
    },
});

export const { addField, deleteField, updateField } = fieldSlice.actions;
export default fieldSlice.reducer;
