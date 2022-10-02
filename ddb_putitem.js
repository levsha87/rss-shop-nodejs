import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2022-10-02' });

const myTable = 'Product_Catalog';

const params = [
    {
        TableName: myTable,
        Item: {
            'id': { S: 'f5a67db0-430e-493b-a566-cef8b1522dad' },
            'title': { S: 'Kodak' },
            'description': { S: 'Детская цифровая камера' },
            'price': { N: '99' }
        },
    },
    {
        TableName: myTable,
        Item: {
            'id': { S: 'e605bf82-d0e5-4370-9254-1977b87831cd' },
            'title': { S: 'Polaroid' },
            'description': { S: 'Мгновенная цифровая камера' },
            'price': { N: '175' }
        },
    }];

params.forEach((param) => post(param));

function post(param) {
    ddb.putItem(param, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}