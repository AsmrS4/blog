import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        pagination: {
            size: 5,
            current: 1,
            count: 10
        }
    },
    reducers: {
        setPageParams: (state, action) => {
            state.pagination = action.payload
        }
    }
})

export const {setPageParams} = paginationSlice.actions;
export default paginationSlice.reducer;