import { createReducer } from "@reduxjs/toolkit";
import productActions from './actions'

const {read_all_products} = productActions

const initialState ={
    productos: []
}

const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        read_all_products.fulfilled,
        (state,action)=>{
            let newState = {
                ...state,
                productos: action.payload.productos
            }
            return newState
        }
    )
)

export default reducer