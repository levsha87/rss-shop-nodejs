export const catalogBatchProcess = async (event) => {
    const products = event.Records.map(({ body })=> body);
    console.log(products);
}