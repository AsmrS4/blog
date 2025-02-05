import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name:'filters',
    initialState: {
        filters: {
            author: '',
            tags: [],
            min: '',
            max: '',
            sorting: '',
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