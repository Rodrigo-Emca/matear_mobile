import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const read_all_products = createAsyncThunk(
    'read_all_products',
    async () => {
        let url = `https://matear-back.onrender.com/api/article`
        try {
            let response = await axios.get(url)
            return {
                productos: response.data.article
            }
        } catch (error) {
            return {
                productos: []
            }
        }
    }
)
const filter_product = createAsyncThunk(
    'filter_product',
    async ({ filter }) => {
        return {
            filter: filter
        }
    }
)

const actions = { read_all_products, filter_product }

export default actions
