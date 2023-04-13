import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const get_one_product = createAsyncThunk(
    'get_one_product',
    async({id, token}) => {
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let url = `https://matear-back.onrender.com/api/article/${id}`;
        try{
            let response = await axios.get(url , headers)
            //console.log(response.data.message)
            return{
                producto: response.data.message
            }
        }catch(error){
            return{
                producto: []
            }
        }
    }
)

const actions = {get_one_product}

export default actions