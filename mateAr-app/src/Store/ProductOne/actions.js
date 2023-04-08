import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const get_one_product = createAsyncThunk(
    'get_one_product',
    async({id}) => {
        let url = `http://localhost:8080/api/article/${id}`;
        try{
            let response = await axios.get(url)
            console.log(response.data.message)
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