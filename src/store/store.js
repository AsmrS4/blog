import { configureStore } from "@reduxjs/toolkit"
import filterReducer from "./reducers/filterReducer"
import paginationReducer from "./reducers/paginationReducer"

export const appStore = configureStore({
    reducer: {
        filters: filterReducer,
        pagination: paginationReducer,
    }
})