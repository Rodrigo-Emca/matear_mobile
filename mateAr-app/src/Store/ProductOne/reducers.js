import { createReducer } from "@reduxjs/toolkit";
import productActions from './actions'

const { get_one_product } = productActions

const initialState = {
    producto: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            get_one_product.fulfilled,
        (state, action) => {
            let newState = {
            ...state,
            producto: action.payload.producto
            }
            return newState
        }
    )
)

export default reducer