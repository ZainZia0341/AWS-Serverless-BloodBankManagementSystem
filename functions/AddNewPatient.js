const { v4 } = require("uuid")
const AWS = require("aws-sdk")

const handler = async (event) => {
  const { Name, FatherName, Age, Gender } = JSON.parse(event.body)
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const NewPatient = {
    id,
    Name,
    FatherName,
    Age,
    Gender
  }

  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const params = {
        GroupName: 'Patient',
        Username: 'hasnain', 
        UserPoolId: 'us-east-1_SYkgZDH1r'
    };
    let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log('User added to group successfully.',res );
  } catch (err) {
    console.error('Error adding user to group:', err);
  }

  await dynamodb.put({
    TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBPatientTable-1A9W56M44ANZT",
    Item: NewPatient
  }).promise()
  console.log(NewPatient)
  return {
    statusCode: 200,
    body: JSON.stringify(NewPatient),
  };

}

module.exports = {
  handler
}
