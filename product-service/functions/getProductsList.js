import { products } from "../products.js";

export const getProductsList = async (event) => {
  
    return {
      statusCode: 200,
      body: JSON.stringify(
        products
      ),
    };
  };