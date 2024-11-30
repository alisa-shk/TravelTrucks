import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slice.js";

export const store = configureStore({
    reducer: {
        campers: campersReducer,
    },
});