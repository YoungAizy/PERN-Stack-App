require('dotenv').config()
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
const AWS = require("aws-sdk");

const poolData = {
	UserPoolId: process.env.COGNITO_USER_POOL_ID, // Your user pool id here
	ClientId: process.env.COGNITO_POOL_CLIENT_ID, // Your client id here
};

exports.userPool = new CognitoUserPool(poolData);

exports.CognitoIdentity = new AWS.CognitoIdentityServiceProvider({region: process.env.AWS_REGION})