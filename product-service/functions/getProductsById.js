import { products } from "../products.js";

export const getProductsById = async (event) => {
    const currentId = event.pathParameters.id;
    const [product] = products.filter((product) => {
      return product.id === currentId;
    });
  
    return {
      statusCode: 200,
      body: JSON.stringify(
        product
      ),
    };
  };