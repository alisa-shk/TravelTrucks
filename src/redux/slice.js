import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCampersThunk = createAsyncThunk(
    'campers/fetchCampers',
    async (filters, {rejectWithValue, dispatch}) => {
        dispatch(resetCampers());
        const queryParams = new URLSearchParams(filters).toString();
        try {
            const response = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers?${queryParams}`);
            if (!response.ok) {
                return rejectWithValue('Error while fetching');
            }
            const data = await response.json();
            return data.items;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCamperByIdThunk = createAsyncThunk(
    'campers/fetchCamperById',
    async id => {
        const response = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers${id}`);
        return await response.json();
    }
);
    
const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        campers: [],
        selectedCamper: null,
        filters: {},
        favorites: [],
        loading: false,
        error: null,
    },
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
        resetFilters(state) {
            state.filters = {};
        },
        resetCampers(state) {
            state.campers = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCampersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCampersThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.campers = action.payload;
            })
            .addCase(fetchCampersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCamperByIdThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCamperByIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedCamper = action.payload;
            })
            .addCase(fetchCamperByIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    },
});

export const { setFilters, resetFilters, resetCampers } = campersSlice.actions;
export default campersSlice.reducer;
