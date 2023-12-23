// import User from '../models/User.model.js';
const {RequestType} = require('../utils/constants/RequestType.js');
const {compare} = require('../utils/checkRequestType.js');
const {Authenticate} = require('../services/auth.service.js');
const {getUserAttr} = require('../services/getUserAttr.service.js');
const {signUp} = require('../services/signup.service.js');
const {verifyAccount} = require('../services/verifyAccount.js');
const {updateUser, updatePassword} = require('../services/update.service.js');
const {verifyUpdate} = require('../services/verifyUpdate.js');
const {recoverPassword} = require('../services/recoverPassword.service.js');
const {resetPassword} = require('../services/resetPassword.service.js')
const {signOut} = require('../services/signOut.service.js');
const {deleteAccount} = require('../services/deleteAccount.service.js');

const {redirectToLoginService} = require('../utils/redirectToLogin.js');
const { unverifiedUsers } = require('../memory/signup_dictionary.js');
const { newSignupCode } = require('../services/newSignupCode.service.js');
const { sendTokens } = require('../utils/helper.js');


// console.log("time", expirationTime);
// console.log("Time now", Date.now());

exports.register = async(req,res)=>{
    console.log("Registration controller:", req.body.data.password);
    if(compare(req.body.request_type, RequestType.REGISTRATION,res)) return;
    console.log("continuing");
    const {data} = req.body;
    console.log(data)

    try {
      const result = await signUp(data.email, data.firstname, data.surname, data.password);
      console.log(result);
      unverifiedUsers[data.email] = data.password;
      res.send(result)
    } catch (error) {
        console.log("Signup Error:",error);
        if(error.code === 'UsernameExistsException') {
            res.status(203).json({ErrorMessage: error.message});
            return;
        }
        res.status(error.statusCode).json({message:error.message})
    }
}

exports.verifyUser = async(req,res)=>{
    if(compare(req.body.request_type, RequestType.VERIFICATION,res)) return;

    const {data} = req.body;
    console.log(req.body.data);
    
    try {
        const result = await verifyAccount(data.email, data.verificationCode);
        console.log(result);

        if(result){
            const accessTokens = await redirectToLoginService(res, data.email);
            res.json({accessTokens});
        }
    } catch (error) {
        if(error.code === 'ExpiredCodeException'){
            res.status(203).json({ErrorMessage: error.message});
            return;
        }
        console.log("Confirmation Code Error:", error);
        res.status(error.statusCode).json({message: error.message});        
    }
}

exports.resendVerificationCode = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.RESEND_VERIFICATION,res)) return;

    console.log("req.body.data", req.body .data);

    try {
        const {CodeDeliveryDetails} = await newSignupCode(req.body.data.email);
        res.status(200).json({verified: CodeDeliveryDetails.Destination});
    } catch (error) {
        console.log("ERROR RESENDING VERIFICATION CODE", error);
        res.send(error);
    }
}

exports.signIn = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.LOGIN,res)) return;
    
    try {
        const authTokens = await Authenticate("USER_PASSWORD_AUTH",{ "USERNAME": req.body.data.email, "PASSWORD": req.body.data.password});
        sendTokens(authTokens,res);
    } catch (error) {
        switch (error.code) {
            case "UserNotConfirmedException":
                unverifiedUsers[req.body.data.email] = req.body.data.password;
                await newSignupCode(req.body.data.email);
                res.status(203).json({isVerified: false});
                break;
            case "UserNotFoundException":
                res.status(203).json({notFound: true});
                break;
            case "InternalErrorException":
                res.status(error.statusCode).json({internalError: true});
                break;
            case "NotAuthorizedException":
                res.status(203).json({unAuthorized: true, message: error.message});
                break;
            default:
                console.log("ERR",error);
                res.status(error.statusCode).json({message: error.message});
                break;
        }
    }
}

exports.refreshToken = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.REFRESH,res)) return;

    const {refreshToken} = req.body;

    try {
        const newTokens = await Authenticate("REFRESH_TOKEN_AUTH", {"REFRESH_TOKEN": refreshToken});
        console.log("newTokens",newTokens);
        sendTokens(newTokens,res);
    } catch (error) {
        console.log("Refresh Error:", error);
        res.status(error.statusCode).json({message: error.message});
    }
}

exports.getUser = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.GET,res)) return;

    const bearerHeader = req.headers['authorization'];
    const parts = bearerHeader.split(' ');
    const accessToken = parts[1];

    try{
    const result = await getUserAttr(accessToken, req.query.data);
    console.log("User Attributes:", result); 
    res.send(result)
    }catch(error){
        console.log("Error fetching user:", error);
        res.send(error);
    }
}

exports.update = async(req,res)=>{
    if(compare(req.body.request_type.slice(0,6), RequestType.UPDATE.slice(0,6),res)) return;

    // const accessToken = req.body.token;
    const {data, token: accessToken} = req.body;
    console.log(accessToken)

    const attr = []
    let result;
    console.log("Update Controller")
    const {request_type} = req.body;
    switch (request_type) {
        case RequestType.insertUserId:
            console.log("inserting userId");
            attr.push({Name:"custom:userid", Value: data.user_id});
            break;
        case RequestType.updateName:
            console.log("update name")
            attr.push({Name: "given_name", Value: data.firstname});
            attr.push({Name: "family_name", Value: data.surname});
            break;
        case RequestType.updateEmail:
            console.log("update email")
            attr.push({Name: "email", Value: data.email});
            break;
        case RequestType.UPDATE:
            console.log("update both")
            attr.push({Name: "given_name", Value: data.firstname});
            attr.push({Name: "family_name", Value: data.surname});
            attr.push({Name: "email", Value: data.email});
            break;
        case RequestType.updatePassword:
            console.log("update password");
            try {
                result = await updatePassword(data.oldPassword, data.newPassword, accessToken);
                result && res.json({successful: result});
            } catch (error) {
                console.log("password update error:", error)
                if(error.code === "NotAuthorizedException"){
                    res.status(203).json({message: error.message, unAuthorized: true});
                    return;
                }
            }
            return;
    }
    try {
        console.log("updating")
        result = await updateUser(attr,accessToken);
        result && res.json({data:result})//TODO: check result.rowCount == 1
    } catch (error) {
        console.log("Update Error:", error);
        if(error.code === "NotAuthorizedException"){
            res.status(203).json({message: error.message});
            return;
        }
        res.status(error.statusCode).json({message: error.message});
    }
}

exports.verifyUpdate = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.updateEmailVerification,res)) return;
    if(req.body.data.attr != "email") return; //don't process the request if the attribute to be verified is not an email
    if(req.body.data.confirmationCode < 4) return; //return if the code is invalid. Use Joi for this.

    const accessToken = req.body.token;
    console.log("Hello: ", accessToken);
    const {data} = req.body;

    try {
        await verifyUpdate(data.attr, accessToken, data.confirmationCode);
        console.log("Done verifying, Redirect")
        const accessTokens = await redirectToLoginService(res, data.email, data.password);
        res.json({accessTokens});
    } catch (error) {
        console.log("ERR", error);
        res.status(error.statusCode).json({message: error.message});
    }

}

exports.forgotPassword = async(req,res)=>{
    if(compare(req.body.request_type, RequestType.resetPassword,res)) return;
    const email = req.body.data.email;
    
    try {
        const result = await recoverPassword(email);
        result && res.send(result);
    } catch (error) {
        console.log("Account Recovery Error:", error);
        res.send(error);
    }
}

exports.passwordReset = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.confirmPasswordReset,res)) return;
    const {email, new_password, confirmationCode} = req.body.data;

    try {
        const result = await resetPassword(new_password, email, confirmationCode);
        result && res.send(result);
    } catch (error) {
        console.log("Recover Code Confirmation Error:", error);
        res.send(error);
    }
}

exports.signOut = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.LOGOUT,res)) return;

    const {refreshToken} = req.body.data;

    try {
        const result = await signOut(refreshToken);
        res.clearCookie('idToken');
        result && res.send(result);
    } catch (error) {
        console.log("Logout Error:", error);
        res.status(error.statusCode).send(error);
    }
}
exports.deleteUser = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.DELETE,res)) return;

    const accessToken = req.body.token;

    try {
        const result = await deleteAccount(accessToken);
        result && res.send(result);
    } catch (error) {
        console.log("Account Deletion Error:",error);
        res.status(error.statusCode).json({message: error.message});
    }
}