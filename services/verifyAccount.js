require('dotenv').config();
const{ CognitoIdentity } = require("../config/cognito.js");

exports.verifyAccount = async (email,verificationCode)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
        Username: email,
        ConfirmationCode: verificationCode
    }

    const result = await CognitoIdentity.confirmSignUp(params).promise();
    console.log("Verify returned result:", result);
    return result;
}