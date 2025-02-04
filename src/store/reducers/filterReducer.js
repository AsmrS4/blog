import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filters',
    initialState: {
        filters: {
            author: null,
            tags: [],
            min: null,
            max: null,
            sorting: null,
            page: 1,
            size: 5
        }
    }, 
    reducers: {
        setFilters: (state, action)=> {
            state.filters = action.payload
        }
    }
})

export const {setFilters} = filterSlice.actions;
export default filterSlice.reducer;