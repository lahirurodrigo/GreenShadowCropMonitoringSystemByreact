import { createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";

import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api/"
})

export interface Field {
    fieldCode: string;
    fieldName: string;
    fieldLocation: string;
    fieldSize: number;
    cropCode: string;
    fieldImage01: string;
    fieldImage02: string;
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

// Fetch Fields asynchronously
export const fetchFields = createAsyncThunk<Field[], void>(
    "crops/fetchCrops",
    async (_, { rejectWithValue}) => {
        try {
            const response = await api.get("/fields");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch Fields");
        }
    }
);

export const addField = createAsyncThunk<Field, Field>(
    "crops/addCrop",
    async (newField, { rejectWithValue }) => {
        try {
            const response = await api.post("/fields", newField);
            alert("Created")
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add Field");
        }
    }
);

// Update Crop
export const updateField = createAsyncThunk<Field, Field>(
    "crops/updateCrop",
    async (updatedField, { rejectWithValue }) => {
        try {
            const response = await api.put(`/fields/${updatedField.fieldCode}`, updatedField);
            alert("Updated")
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update crop");
        }
    }
);

// Delete Crop
export const deleteField = createAsyncThunk<string, string>(
    "crops/deleteCrop",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/fields/${id}`);
            alert(response.status)
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete Field");
        }
    }
);

const fieldSlice = createSlice({
    name: "fields",
    initialState,
    reducers: {
        addFieldLocal: (state, action: PayloadAction<Field>) => {
            state.list.push(action.payload);
        },
        deleteFieldLocal: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((field) => field.fieldCode !== action.payload);
        },
        updateFieldLocal: (state, action: PayloadAction<Field>) => {
            const index = state.list.findIndex((field) => field.fieldCode === action.payload.fieldCode);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchFields
            .addCase(fetchFields.pending, (state) => {
                console.log(state);
            })
            .addCase(fetchFields.fulfilled, (state, action: PayloadAction<Field[]>) => {
                state.list = action.payload;
            })
            .addCase(fetchFields.rejected, (state, action) => {
                console.error(state);
            })

            // Handle addField
            .addCase(addField.pending, (state) => {
                console.log(state);
            })
            .addCase(addField.fulfilled, (state, action: PayloadAction<Field>) => {
                state.list.push(action.payload);
            })
            .addCase(addField.rejected, (state, action) => {
                console.error("Failed to add field:", action.payload);
                console.error(state);
            })

            // Handle updateField
            .addCase(updateField.pending, (state) => {
                console.log("Updating field...");
            })
            .addCase(updateField.fulfilled, (state, action: PayloadAction<Field>) => {
                const index = state.list.findIndex((field) => field.fieldCode === action.payload.fieldCode);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateField.rejected, (state, action) => {
                console.error("Failed to update field:", action.payload);
            })

            // Handle deleteField
            .addCase(deleteField.pending, (state) => {
                console.log("Deleting field...");
            })
            .addCase(deleteField.fulfilled, (state, action: PayloadAction<string>) => {
                state.list = state.list.filter((field) => field.fieldCode !== action.payload);
            })
            .addCase(deleteField.rejected, (state, action) => {
                console.error("Failed to delete field:", action.payload);
            });
    },
});

export const { addFieldLocal, deleteFieldLocal, updateFieldLocal } = fieldSlice.actions;
export default fieldSlice.reducer;
