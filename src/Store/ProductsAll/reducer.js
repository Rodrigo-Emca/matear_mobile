import { createReducer } from "@reduxjs/toolkit";
import productActions from './actions'

const { read_all_products, filter_product } = productActions

const initialState = {
    productos: [],
    productosFiltrados: [],
}

const reducer = createReducer(
    initialState,
    (builder) => builder
        .addCase(
            read_all_products.fulfilled,
            (state, action) => {
                let newState = {

                    ...state,
                    productos: action.payload.productos,
                    productosFiltrados: action.payload.productos
                }
                return newState
            }
        ) 
        .addCase(
            filter_product.fulfilled,
            (state, action) => {
                let categories = action.payload.filter.categories

                let newArray = state.productos.filter((item) => {
                    let condition = action.payload.filter.condition.toLowerCase()
                    let title = item.title.toLowerCase()
                    if (title.indexOf(condition) !== -1) {
                        return true
                    } else {
                        return false
                    }
                })

                if (categories.length !== 0) {
                    let categoriesArray = []
                    for (let i = 0; i < categories.length; i++) {
                        let item = categories[i]
                        for (let z = 0; z < newArray.length; z++) {
                            let product = newArray[z]
                            if (product.product_id.category_id === item) {
                                categoriesArray.push(product)
                            }

                        }
                    }
                    newArray = categoriesArray
                }

                let newState = {
                    ...state,
                    productosFiltrados: newArray
                }

                return newState
            }
        )
)

export default reducer