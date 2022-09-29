'use strict';

const products = [{
  title: "Canon",
  description: "SX120IS",
  price: 80,
  id: "1",
  count: 5
},
{
  title: "Sony",
  description: "X25",
  price: 45,
  id: "2",
  count: 7
}];

module.exports.getProductsList = async (event) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      products
    ),
  };
};

module.exports.getProductsById = async (event) => {
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