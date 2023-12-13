require('dotenv').config();
const{ CognitoIdentity } = require("../config/cognito.js");


exports.Authenticate = async(authFlow, authParams)=>{
    const params = {
        AuthFlow: authFlow,
        AuthParameters: authParams,
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
    }

   const result = await CognitoIdentity.initiateAuth(params).promise();
   return result.AuthenticationResult;

 


}