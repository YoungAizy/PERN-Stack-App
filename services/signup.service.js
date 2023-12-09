require('dotenv').config();
// import bcrypt from 'bcryptjs';
const { CognitoIdentity } = require("../config/cognito.js");
const { v4: uuidv4 } = require('uuid');


exports.signUp = async (email,firstname, surname, password, suspended = false)=>{
    let attr = []
    attr.push({Name: "email", Value: email});
    attr.push({Name: "given_name", Value: firstname});
    attr.push({Name: "family_name", Value: surname});
    // attr.push({Name: "userId", Value: uuidv4()});

    const params = {
        ClientId: process.env.COGNITO_POOL_CLIENT_ID,
        Username: email,
        Password: password,
        UserAttributes: attr,

    }

    const result = await CognitoIdentity.signUp(params).promise();
    return result;
}