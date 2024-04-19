const AWS = require("aws-sdk")

const handler = async (event) => {
  const { Name, FatherName, Age, Gender } = JSON.parse(event.body);
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const { id } = event.pathParameters

  await dynamodb.update({
    TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBPatientTable-L9OTAUVYTE7G",
    Key: { id },
    UpdateExpression: 'set #Name = :Name, #FatherName = :FatherName, #Age = :Age, #Gender = :Gender', 
    ExpressionAttributeNames: {
        "#Name": "Name",
        "#FatherName": "FatherName",
        "#Age": "Age",
        "#Gender": "Gender"
    },
    ExpressionAttributeValues: {
        ':Name': Name,
        ':FatherName': FatherName,
        ':Age': Age,
        ':Gender': Gender
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Patient's data updated"
      }
    ),  
  };
};

module.exports = {
  handler
}
    