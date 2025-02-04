import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        pageParams: {
            currentPage: 1,
            count: 10
        }
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.pageParams.page = action.payload
        },
        setCount: (state, action) => {
            state.pageParams.count = action.payload
        }
    }
})

export const {setCurrentPage, setCount} = paginationSlice.actions;
export default paginationSlice.reducer;