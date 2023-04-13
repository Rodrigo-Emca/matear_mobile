import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const read_all_products = createAsyncThunk(
    'read_all_products',
    async() => {
        let url = `https://matear-back.onrender.com/api/article`
        try{
            let response = await axios.get(url)
            //console.log(response.data.article)
            return{
                productos: response.data.article
            }
        }catch(error){
            return{
                productos: []
            }
        }
    }
)

const actions = {read_all_products}

export default actions