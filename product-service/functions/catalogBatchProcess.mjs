import AWS from 'aws-sdk';

export const catalogBatchProcess = async (event) => {
    const products = event.Records.map(({ body })=> body);
    const sns = new AWS.SNS({ region: 'eu-west-1'});
    console.log(products);

    sns.publish({
        Subject: "Products created",
        Message: JSON.stringify(products),
        TopicArn: process.env.SNS_ARN
    }, () => {
        console.log('Pruducts created:' + JSON.stringify(products)); 
    })
}