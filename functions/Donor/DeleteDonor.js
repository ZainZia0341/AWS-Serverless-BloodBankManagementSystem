const AWS = require("aws-sdk")


const handler = async (event) => {
    try{
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters
        const params = {
            TableName: 'awsserverlessbloodbankmanagementsystem-dev-DynamoDBDonorTable-DXB6PPASX8SH',
            Key: { id }
          };
          await dynamodb.delete(params).promise();

return {
    statusCode: 200,
    body: JSON.stringify({message: "Deleted!"}),
  };    
    }   catch(err) {
        console.log(err)
    }
};

module.exports = {
  handler
}