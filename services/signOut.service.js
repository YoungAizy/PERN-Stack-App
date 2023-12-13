require('dotenv').config();
const { CognitoIdentity } = require("../config/cognito.js");

exports.signOut = async (token)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
        Token: token
    }

    const result = await CognitoIdentity.revokeToken(params).promise();
    return result;
}