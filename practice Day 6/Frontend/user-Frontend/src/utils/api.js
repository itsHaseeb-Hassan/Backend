 const url="http://localhost:8000/api/users/register"
 import axios from "axios"

 export const createUser = async (data) => {
   try {
     const response = await axios.post(url, data)
     return response
   } catch (error) {
    console.log(`Error: ${error}`)
    return error;
   }
 }
