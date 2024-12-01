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
        const response = await fetch(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        return await response.json();
    }
);
    
const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        campers: [],
        selectedCamper: null,
        shownCampers: [],
        filters: {},
        tempFilters: {},
        favorites: JSON.parse(localStorage.getItem('favorites')) || [],
        loading: false,
        error: null,
    },
    reducers: {
        setFilters(state, action) {
            state.filters = action.payload;
        },
        resetFilters(state) {
            state.filters = {};
            state.tempFilters = {};
        },
        setTempFilters(state, action) {
            state.tempFilters = action.payload;
        },
        resetCampers(state) {
            state.campers = [];
            state.shownCampers = [];
        },
        toggleFavorite(state, action) {
            const newFavorite = action.payload;
            const index = state.favorites.findIndex(fav => fav.id === newFavorite.id);
            if (index === -1) {
                state.favorites.push(newFavorite);
            } else {
                state.favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(
                fav => fav.id !== action.payload.id
            );
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        loadMoreCampers(state, action) {
            const moreCampers = action.payload;
            state.shownCampers = [...state.shownCampers, ...moreCampers];
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
                state.shownCampers = action.payload.slice(0, 4);
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

export const { setFilters, resetFilters, setTempFilters, resetCampers, loadMoreCampers, toggleFavorite, removeFavorite } = campersSlice.actions;
export default campersSlice.reducer;
