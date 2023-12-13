const {unverifiedUsers} = require('../memory/signup_dictionary.js');
const { Authenticate} = require('../services/auth.service.js');

exports.redirectToLoginService = async (email)=>{
    //first lookup password in signup dictionary;
    const userPassword = unverifiedUsers[email];

    const tokens = await Authenticate("USER_PASSWORD_AUTH", {"USERNAME":email,"PASSWORD":userPassword});
    tokens && delete unverifiedUsers[email];

    return tokens;
}