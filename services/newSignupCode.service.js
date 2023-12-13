require('dotenv').config();
const { CognitoIdentity } = require("../config/cognito.js");

exports.newSignupCode = async(email)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID ,
        Username: email
    }

    const result = await CognitoIdentity.resendConfirmationCode(params).promise();
    return result;
}