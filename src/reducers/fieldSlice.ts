import { createSlice, PayloadAction} from "@reduxjs/toolkit";

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
});

export const { addField, deleteField, updateField } = fieldSlice.actions;
export default fieldSlice.reducer;
