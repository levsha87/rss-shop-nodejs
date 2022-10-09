import { getProductsList } from "./getProductsList.mjs";

export const getProductsById = async (event) => {
    const products = await getProductsList();
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