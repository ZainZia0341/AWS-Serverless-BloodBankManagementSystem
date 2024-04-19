const AWS = require("aws-sdk")

const handler = async (event) => {
    // const dynamodb = new AWS.DynamoDB.DocumentClient();
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
};

module.exports = {
    handler
}