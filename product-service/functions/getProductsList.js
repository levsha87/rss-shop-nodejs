import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2022-10-02' });

const scan = async () => {
  const products = await ddb.scan({
    TableName: "Product_Catalog"
  }).promise();
  
  return products;
}

export const getProductsList = async (event) => {
  const products = scan();

  return products;
}