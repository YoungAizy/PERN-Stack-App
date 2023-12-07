require('dotenv').config();
const { CognitoIdentity } = require("../config/cognito.js");

exports.recoverPassword = async(email)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID ,
        Username: email
    }

    const result = await CognitoIdentity.forgotPassword(params).promise();
    return result;
}