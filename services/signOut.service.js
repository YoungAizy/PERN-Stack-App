const { CognitoIdentity } = require("../config/cognito.js");

exports.signOut = async (token)=>{
    const params = {
        AccessToken: token
    }

    const result = await CognitoIdentity.globalSignOut(params).promise();
    return result;
}