// services.js

import axios from 'axios';

const API_URL = 'https://fakestoreapi.com'; // Replace this with your API URL

// const fetchData = async () => {
//   try {
//     const response = await axios.get(`${API_URL}/products`);

//     if(response && response.data){
//       return response.data;
//     }
//     else{
//         throw new Error("Failed");
//     }

// } catch (error) {
//     // Handle errors, such as logging them or throwing an error
//     console.error('Error fetching data:', error);
//   }

  
// };

const fetchData = async () => {
  let endpoint = `${API_URL}/products`; 
  return await axios.get(endpoint)
  .then((response) => { //.then means promise data
    // console.log(response , "response")
      if(response && response.data) {
        (response.data).map(item => {item.price = (((Math.round(item.price)* 83.89)*100)/100)});
        return response.data;
      }
  }).catch((error)=>{
      console.log(error);
  })
}



export default fetchData;
