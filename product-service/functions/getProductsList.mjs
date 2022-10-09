import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

const Client = new AWS.DynamoDB.DocumentClient();

const scanProductCatalog = async () => {
  const products = await Client.scan({
    TableName: "Product_Catalog"
  }).promise();
  
  return products;
}

const scanStocks = async () => {
  const products = await Client.scan({
    TableName: "Stocks"
  }).promise();
  
  return products;
}

export const getProductsList = async (event) => {
  const products = (await scanProductCatalog()).Items;
  const productsStock= (await scanStocks()).Items;

  if(products.length > productsStock.length) {
    const productsFinally = [];
    
    productsStock.forEach((item) => {
      products.forEach((product) => {
        if(item.product_id === product.id) {
          productsFinally.push({...product, "count": item.count})
        }
      });
    });

    return productsFinally;
  } else {
    const productsFinally = [];

    products.forEach((product) => {
      productsStock.forEach((item) => {
        if(product.id === item.product_id) {
          productsFinally.push({...product, "count": item.count})
        }
      });
    });

    return productsFinally;
  }
}