const { v4 } = require("uuid")
const AWS = require("aws-sdk")

const handler = async (event) => {
  const { Name, FatherName, Age, Gender, BloodType } = JSON.parse(event.body)
  const dynamodb = new AWS.DynamoDB.DocumentClient()
  const id = v4()

  const NewDonor = {
    id,
    Name,
    FatherName,
    Age,
    Gender,
    BloodType
  }

  try {
    const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
    const params = {
        GroupName: 'Donor',
        Username: 'hasnain', 
        UserPoolId: 'us-east-1_SYkgZDH1r'
    };
    let res =await cognitoIdentityServiceProvider.adminAddUserToGroup(params).promise();
    console.log('User added to group successfully.',res );
  } catch (err) {
    console.error('Error adding user to group:', err);
  }

  await dynamodb.put({
    TableName: "awsserverlessbloodbankmanagementsystem-dev-DynamoDBDonorTable-DXB6PPASX8SH",
    Item: NewDonor
  }).promise()
  console.log(NewDonor)
  return {
    statusCode: 200,
    body: JSON.stringify(NewDonor),
  };

}

module.exports = {
  handler
}
