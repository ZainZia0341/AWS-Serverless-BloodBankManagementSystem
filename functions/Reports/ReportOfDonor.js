const AWS = require("aws-sdk")

const handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const results = await dynamodb.scan({ TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBDonorTable-DXB6PPASX8SH" }).promise()
        return {
            statusCode: 200,
            body: JSON.stringify(results),
          };
    } catch (error) {
    console.log(error)
}
};

module.exports = {
    handler
}