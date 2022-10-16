import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event) => {
    const body = JSON.parse(event.body);

    const {count, ...rest} = body;

    const product = {
        ...rest,
        id: uuidv4(),
      };  
  
      const stocks = {    
          count,
          product_id: product.id,
      }  

      await Client.put({
        TableName: 'Product_Catalog',    
        Item: product,
      }).promise();
  
      await Client.put({
        TableName: 'Stocks',    
        Item: stocks,
      }).promise();

      return {
        statusCode: 201,
        body: JSON.stringify(product) + "\n" + JSON.stringify(stocks),
      };
}