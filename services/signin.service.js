require('dotenv').config();
const{ CognitoIdentity } = require("../config/cognito.js");


exports.SignIn = async(email,password)=>{
    const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters:{
            "USERNAME": email,
            "PASSWORD": password
        },
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    }

   const result = await CognitoIdentity.initiateAuth(params).promise();
   return result.AuthenticationResult;

 


}