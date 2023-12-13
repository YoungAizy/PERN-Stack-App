const{ CognitoIdentity } = require("../config/cognito.js");

exports.getUserAttr = async(token,attr)=>{
    // const attr = {"custom:suspended": "ok", email_verified:"ok", "custom:userid": "ok"}
    console.log(attr)
    const params = {
        AccessToken: token,
    }
    const result = await CognitoIdentity.getUser(params).promise();
    console.log("Get User Service", result);
    const filtered = result.UserAttributes.filter(attribute=> attr.hasOwnProperty(attribute.Name) );
    console.log("Filtered:", filtered)
    return filtered;
}