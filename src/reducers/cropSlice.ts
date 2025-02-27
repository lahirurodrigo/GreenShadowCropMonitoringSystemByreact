import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface Crop {
    cropCode: string;
    cropCommonName: string;
    cropScientificName: string;
    cropCategory: string;
    cropSeason: string;
    images: File[];
}

interface CropState {
    list: Crop[];
}

const initialState: CropState = {
    list: [],
};

// Fetch crops asynchronously
export const fetchCrops = createAsyncThunk<Crop[], void>(
    "crops/fetchCrops",
    async () => {
        const response = await fetch("/api/crops");
        return (await response.json()) as Crop[];
    }
);

const cropSlice = createSlice({
    name: "crops",
    initialState,
    reducers: {
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.list.push(action.payload);
        },
        deleteCrop: (state, action: PayloadAction<string>) => {
            state.list = state.list.filter((crop) => crop.cropCode !== action.payload);
        },
        updateCrop: (state, action: PayloadAction<Crop>) => {
            const index = state.list.findIndex((crop) => crop.cropCode === action.payload.cropCode);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCrops.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const { addCrop, deleteCrop, updateCrop } = cropSlice.actions;
export default cropSlice.reducer;
