import AWS from 'aws-sdk';
import CSV from 'csv-parser';

AWS.config.update({ region: 'eu-west-1' });

export const importProductsFile = async (event) => {
    const s3 = new AWS.S3();
    const BUCKET = 'uploaded-dcam-products';
    const fileName = event.pathParameters.name;
    const params = { 
        Bucket: BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: 'text/csv'
     };
    // const products = [];

    try {
        const file = s3.getObject(params).createReadStream();

        file
            .pipe(csv())
            .on('data', function (data) {
                results.push(data); // --> here
            })
            .on('end', () => {
                console.log(results);
                callback(null, results);
            });
    } catch (err) {
        console.log(err);
        callback(Error(err));
    }
  };