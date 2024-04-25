// const { v4 } = require("uuid")
// const AWS = require("aws-sdk")

// const handler = async (event) => {
//   const { Name, FatherName, Age, Gender } = JSON.parse(event.body)
//   const dynamodb = new AWS.DynamoDB.DocumentClient()
//   const id = v4()

//   const NewPatient = {
//     id,
//     Name,
//     FatherName,
//     Age,
//     Gender
//   }

//   // try {
//   //   const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
//   //   const params = {
//   //       GroupName: 'Patient',
//   //       Username: 'hasnain', 
//   //       UserPoolId: 'us-east-1_SYkgZDH1r'
//   //   };
//   //   let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
//   //   console.log('User added to group successfully.',res );
//   // } catch (err) {
//   //   console.error('Error adding user to group:', err);
//   // }

//   await dynamodb.put({
//     TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBPatientTable-1A9W56M44ANZT",
//     Item: NewPatient
//   }).promise()
//   console.log(NewPatient)
//   return {
//     statusCode: 200,
//     body: JSON.stringify(NewPatient),
//   };

// }

// module.exports = {
//   handler
// }


// import { Auth } from 'aws-amplify';
// const user =  await Auth.currentAuthenticatedUser();
// // Returns an array of groups
// const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
// const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
// groups.includes('admin'); // true



// const AWS = require('aws-sdk');

// exports.handler = async (event) => {
//     const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

//     const params = {
//         UserPoolId: 'YourUserPoolId', // Replace with your Cognito User Pool ID
//         Username: event.requestContext.authorizer.claims['cognito:username'] // Assuming you're using Cognito authorizer
//     };

//     try {
//         const userGroups = await cognitoidentityserviceprovider.adminListGroupsForUser(params).promise();
        
//         // Check if the user belongs to the admin group
//         const isAdmin = userGroups.Groups.some(group => group.GroupName === 'admin');
        
//         if (isAdmin) {
//             // Allow the PUT operation to proceed
//             return { statusCode: 200, body: JSON.stringify("User is in the admin group. Allowing PUT operation.") };
//         } else {
//             // Deny the PUT operation
//             return { statusCode: 403, body: JSON.stringify("User is not authorized to perform this operation.") };
//         }
//     } catch (err) {
//         console.error(err);
//         return { statusCode: 500, body: JSON.stringify("Internal server error.") };
//     }
// };