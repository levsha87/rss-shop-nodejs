'use strict';
const products = [{
  title: "Canon",
  model: "SX120IS",
  price: "$80",
  id: 1
},
{
  title: "Sony",
  model: "X25",
  price: "$45",
  id: 2
}];

module.exports.getProductsList = async (event) => {
  
  return {
    statusCode: 200,
    body: JSON.stringify(
      products,
      null,
      2
    ),
  };
};

module.exports.getProductsById = async (event) => {
  const pathname = window.location.pathname;
  const splitPath = pathname.split("/");
  const currentId = splitPath[splitPath.length-1];

  console.log('current id', currentId);

  return {
    statusCode: 200,
    body: JSON.stringify(
      products.filter((product) => product.id === currentId),
      null,
      2
    ),
  };
};