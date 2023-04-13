import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_all_categories = createAsyncThunk(
    'read_all_categories',
    async () => {
        try {
            let response = await axios.get(`https://matear-back.onrender.com/api/categories`)
            return {
                categories: response.data.categories
            }
        } catch {
            return {
                categories: []
            }
        }
    }
)

const actions = { read_all_categories }
export default actions 