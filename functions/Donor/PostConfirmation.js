const AWS = require("aws-sdk")
const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

const handler = async (event, context) => {
    // const dynamodb = new AWS.DynamoDB.DocumentClient();
    try {
        const { userName, userPoolId } = event.request.userAttributes;
        const params = {
            GroupName: 'Donor',
            Username: userName, 
            UserPoolId: userPoolId
        };
        let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
        console.log('User added to group successfully.',res );
        return {"checkingReturn": event};
      } catch (err) {
        console.error('Error adding user to group:', err);
      }
      console.log(JSON.stringify(event))
};

module.exports = {
    handler
}