require('dotenv').config();
const { CognitoIdentity } = require("../config/cognito.js");

exports.resetPassword = async (newPassword, email, confirmationCode)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Username: email,
        Password: newPassword
    }

    const result = await CognitoIdentity.confirmForgotPassword(params).promise();
    return result;
}