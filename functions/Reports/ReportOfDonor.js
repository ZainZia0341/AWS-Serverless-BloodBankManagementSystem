const AWS = require("aws-sdk")

const handler = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const { id } = event.pathParameters
        const results = await dynamodb.get({ 
            TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBDonorTable-DXB6PPASX8SH",
            Key: {id}
        }).promise()
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