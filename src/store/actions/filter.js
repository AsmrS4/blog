import { setFilters } from "../reducers/filterReducer"

export const setFilterParams = (params) => async(dispatch)=> {
    dispatch(setFilters(params));
}