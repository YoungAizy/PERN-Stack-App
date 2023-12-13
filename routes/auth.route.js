const express = require("express");
const { register, signIn, deleteUser, update, signOut, 
    verifyUser, verifyUpdate, 
    forgotPassword, passwordReset, getUser, refreshToken } = require("../controllers/AuthController.js");
const {verifyToken} = require("../middleware/verifyToken.js");
const AuthRouter = express.Router();

AuthRouter.post('/registration',register);
AuthRouter.post('/registration/verify', verifyUser);
AuthRouter.post('/login',signIn);
AuthRouter.post('/token/refresh', refreshToken);
// AuthRouter.get('/user',getUser);
AuthRouter.patch('/update', verifyToken ,update);
AuthRouter.post('/update/verify', verifyToken, verifyUpdate);
AuthRouter.post('/account/recovery',forgotPassword);
AuthRouter.post('/account/password_reset/confirm', passwordReset);
AuthRouter.post('/logout', signOut);
AuthRouter.delete('/delete', verifyToken ,deleteUser);

module.exports = {AuthRouter};