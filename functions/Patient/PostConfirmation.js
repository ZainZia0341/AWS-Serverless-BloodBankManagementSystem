const AWS = require("aws-sdk")
const { v4 } = require("uuid")


const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const handler = async (event, context) => {
  // const { Name, FatherName, Age, Gender } = JSON.parse(event.body)
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const NewPatient = {
    id,
    Name: event.userName,
    FatherName: event.request.userAttributes.family_name,
    Email: event.request.userAttributes.email
  }

  await dynamodb.put({
    TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBPatientTable-1A9W56M44ANZT",
    Item: NewPatient
  }).promise()
  console.log(NewPatient)


  console.log("event", JSON.stringify(event))
  console.log("userPoolId", event.userPoolId, "UserName", event.userName)
    // const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const params = {
            GroupName: 'Patient',
            Username: event.userName, 
            UserPoolId: event.userPoolId   
        };
        let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
        console.log('User added to group successfully.',res );

        return event;
      } catch (err) {
        console.error('Error adding user to group:', err);
      }

};

module.exports = {
    handler
}