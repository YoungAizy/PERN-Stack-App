const { CognitoIdentity } = require("../config/cognito.js");

exports.deleteAccount = async(token)=>{
    const params = {
        AccessToken: token
     }

     const result = await CognitoIdentity.deleteUser(params).promise();
     return result;
}