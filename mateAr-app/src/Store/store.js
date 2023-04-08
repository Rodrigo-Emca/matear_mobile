import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductsAll/reducer'
import getOneProductReducer from './ProductOne/reducers'

const store = configureStore({
    reducer: {
        productos: productReducer, //para traer TODOS los productos
        producto: getOneProductReducer, //para traer UN SOLO producto
    }
})
export default store