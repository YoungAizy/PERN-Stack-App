const {unverifiedUsers} = require('../memory/signup_dictionary.js');
const { Authenticate} = require('../services/auth.service.js');

exports.redirectToLoginService = async (res, email, password)=>{
    console.log("dictionary: ", unverifiedUsers);
    console.log("email: ", email);
    console.log(unverifiedUsers[email]);
    //first lookup password in signup dictionary;
    const userPassword = unverifiedUsers[email] || password;
    console.log("password:", userPassword);

    const unixHour = 60000 * 60;
    const dayUnix = unixHour * 24;
    const expirationTime = Date.now() + dayUnix;

    const authTokens = await Authenticate("USER_PASSWORD_AUTH", {"USERNAME":email,"PASSWORD":userPassword});
    authTokens && delete unverifiedUsers[email];

    const {IdToken, ... accessTokens} = authTokens;
    IdToken && res.cookie("idToken", IdToken,{httpOnly: true, sameSite: "lax", maxAge: expirationTime});
    console.log("User Verified:", accessTokens);

    return accessTokens;
}