require('dotenv').config();
const{ CognitoIdentity } = require("../config/cognito.js");

exports.updateUser = async(attr,token)=>{
    const params = {
        AccessToken: token,
        UserAttributes: attr
    }
    const result = await CognitoIdentity.updateUserAttributes(params).promise();
    console.log("Service", result);
    return result;
}

exports.updatePassword = async(oldPassword,newPassword, token)=>{
    const params = {
        AccessToken: token,
        PreviousPassword: oldPassword,
        ProposedPassword: newPassword
     }
    const result = await CognitoIdentity.changePassword(params).promise();
    console.log("Service",result);
    return result;
}
