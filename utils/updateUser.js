import * as AWS from 'aws-sdk';
import 'dotenv/config';

const CognitoIdentity = new AWS.CognitoIdentityServiceProvider({region: process.env.AWS_REGION});

export const updateUser = async(userId,token)=>{
    const attribute = [{Name:"custom:userid", Value: userId}]
    const params = {
        AccessToken: token,
        UserAttributes: attribute
    }
    const result = await CognitoIdentity.updateUserAttributes(params).promise();
    console.log("userId Insertion:", result);
    return result;
}