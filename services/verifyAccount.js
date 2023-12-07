require('dotenv').config();
const{ CognitoIdentity } = require("../config/cognito.js");

exports.verifyAccount = async (email,verificationCode)=>{
    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
        Username: email,
        ConfirmationCode: verificationCode
    }

    CognitoIdentity.confirmSignUp(params,(err,data)=>{
        if(err){
            console.log("Confirmation Code Incorrect");
            return err;
        }

        return data;
    })
}