const AWS = require("aws-sdk")

const handler = async (event) => {
  const { Name, FatherName, Age, Gender, BloodType } = JSON.parse(event.body);
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const { id } = event.pathParameters

  await dynamodb.update({
    TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBDonorTable-DXB6PPASX8SH",
    Key: { id },
    UpdateExpression: 'set #Name = :Name, #FatherName = :FatherName, #Age = :Age, #Gender = :Gender #BloodType = :BloodType', 
    ExpressionAttributeNames: {
        "#Name": "Name",
        "#FatherName": "FatherName",
        "#Age": "Age",
        "#Gender": "Gender",
        "#BloodType": "BloodType"
    },
    ExpressionAttributeValues: {
        ':Name': Name,
        ':FatherName': FatherName,
        ':Age': Age,
        ':Gender': Gender,
        ":BloodType": BloodType
    },
    ReturnValues: "ALL_NEW"
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Donor's data updated"
      }
    ),  
  };
};

module.exports = {
  handler
}
    