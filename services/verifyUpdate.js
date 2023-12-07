const{ CognitoIdentity } = require("../config/cognito.js");

exports.verifyUpdate = async (attribute, token, code)=>{
    const params = {
        AccessToken: token,
        AttributeName: attribute,
        Code: code
    }

    const result = await CognitoIdentity.verifyUserAttribute(params).promise();
    return result;
}