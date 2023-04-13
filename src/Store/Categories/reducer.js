import { createReducer } from "@reduxjs/toolkit";
import categoriesActions from './actions'

const {read_all_categories} = categoriesActions

const initialState = {
    categories: []
}

const reducer = createReducer(
    initialState,
    (builder)=> builder
    .addCase(
        read_all_categories.fulfilled,
        (state,action)=>{
            let newState = {
                ...state,
                categories: action.payload.categories
            }
            return newState
        }
    )
)

export default reducer