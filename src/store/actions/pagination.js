import { setPageParams } from "../reducers/paginationReducer"

export const setPagination = (params) => async(dispatch) => { 
    dispatch(setPageParams(params));
}