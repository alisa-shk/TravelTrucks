import { createSelector } from "@reduxjs/toolkit";

export const selectAllCampers = (state) => state.campers.campers;
export const selectSelectedCamper = (state) => state.campers.selectedCamper;
export const selectFilters = (state) => state.campers.filters;
export const selectFavorites = (state) => state.campers.favorites;
export const selectIsLoading = (state) => state.campers.loading;
export const selectIsError = (state) => state.campers.error;

export const selectedFilteredCampers = createSelector(
    [selectAllCampers, selectFilters], (campers, filters) => {
        return campers.filter(camper => {
            return Object.entries(filters).every(
                ([key, value]) => camper[key] === value
            );
        });
    }
);

export const selectIsFavorite = camperId =>
    createSelector([selectFavorites], favorites => 
        favorites.some(favorite => favorite.id === camperId)
    );