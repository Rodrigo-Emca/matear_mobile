import { configureStore } from '@reduxjs/toolkit'
import productReducer from './ProductsAll/reducer'
import getOneProductReducer from './ProductOne/reducers'
import bottomTabsReducer from "./Perfil/reducer"
import mangaClickReducer from "./Logout/reducer"
import categoriesReducer from "./Categories/reducer"


export const store = configureStore({
    reducer: {
        productos: productReducer, //para traer TODOS los productos
        producto: getOneProductReducer, //para traer UN SOLO producto
        bottomTabsReducer: bottomTabsReducer,
        mangaClickReducer: mangaClickReducer,
        categories: categoriesReducer, // para ver todas las categorias

    }
})