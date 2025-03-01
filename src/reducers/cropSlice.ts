import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5000/api/"
})

export interface Crop {
    cropCode: string;
    cropCommonName: string;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;
    cropImage: string;
}

interface CropState {
    list: Crop[];
    loading: boolean;
    error: string | null;
}

const initialState: CropState = {
    list: [],
    loading: false,
    error: null,
};

// Fetch All Crops
export const fetchCrops = createAsyncThunk<Crop[], void>(
    "crops/fetchCrops",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/crops");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to fetch crops");
        }
    }
);

// Add Crop
export const addCrop = createAsyncThunk<Crop, Crop>(
    "crops/addCrop",
    async (newCrop, { rejectWithValue }) => {
        try {
            const response = await api.post("/crops", newCrop);
            alert("Created")
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to add crop");
        }
    }
);

// Update Crop
export const updateCrop = createAsyncThunk<Crop, Crop>(
    "crops/updateCrop",
    async (updatedCrop, { rejectWithValue }) => {
        try {
            const response = await api.put(`/crops/${updatedCrop.cropCode}`, updatedCrop);
            alert("Created")
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update crop");
        }
    }
);

// Delete Crop
export const deleteCrop = createAsyncThunk<string, string>(
    "crops/deleteCrop",
    async (cropCode, { rejectWithValue }) => {
        try {
            await api.delete(`/crops/${cropCode}`);
            return cropCode;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete crop");
        }
    }
);

const cropSlice = createSlice({
    name: "crops",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Crops
            .addCase(fetchCrops.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCrops.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCrops.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Add Crop
            .addCase(addCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(addCrop.fulfilled, (state, action) => {
                state.loading = false;
                state.list.push(action.payload);
            })
            .addCase(addCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Update Crop
            .addCase(updateCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCrop.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.list.findIndex((crop) => crop.cropCode === action.payload.cropCode);
                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(updateCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete Crop
            .addCase(deleteCrop.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCrop.fulfilled, (state, action) => {
                state.loading = false;
                state.list = state.list.filter((crop) => crop.cropCode !== action.payload);
            })
            .addCase(deleteCrop.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default cropSlice.reducer;
