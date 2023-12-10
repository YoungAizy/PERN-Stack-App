const {unverifiedUsers} = require('../memory/signup_dictionary.js');
const { SignIn } = require('../services/signin.service.js');

exports.redirectToLoginService = async (email)=>{
    console.log("email:", email);
    console.log("User emails:",unverifiedUsers)
    console.log("User password:",unverifiedUsers[email])
    //first lookup password in signup dictionary;
    const userPassword = unverifiedUsers[email];
    const tokens = await SignIn(email,userPassword);
    tokens && delete unverifiedUsers[email];
    tokens && console.log("after deletion:", unverifiedUsers)
    return tokens;
}