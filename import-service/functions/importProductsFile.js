import AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1' });

export const importProductsFile = async (event) => {
    const s3 = new AWS.S3();
    const BUCKET = 'uploaded-dcam-products';
    const { name } = event.queryStringParameters;
    
    const params = { 
        Bucket: BUCKET,
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType: 'text/csv'
     };

    try {
        const signedUrl = await s3.getSignedUrlPromise('putObject', params);
        console.log('signedUrl:', signedUrl);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(signedUrl)
        }
    } catch (err) {
        return{
            statusCode: 500,
            message: 'Ooops, something went wrong',
            error: JSON.stringify(err)
        }
    }
  };