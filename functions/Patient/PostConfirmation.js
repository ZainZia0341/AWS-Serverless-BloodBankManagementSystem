const AWS = require("aws-sdk")
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const handler = async (event, context) => {
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

        return {"checkingReturn": event};
      } catch (err) {
        console.error('Error adding user to group:', err);
      }

};

module.exports = {
    handler
}