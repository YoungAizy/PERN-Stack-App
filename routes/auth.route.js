const express = require("express");
const { register, signIn, deleteUser, update, signOut, 
    verifyUser, verifyUpdate, 
    forgotPassword, passwordReset } = require("../controllers/AuthController.js");
// const {verifyToken} = require("../middleware/verifyToken.js");
const AuthRouter = express.Router();

AuthRouter.post('/registration',register);
AuthRouter.post('/registration/verify', verifyUser);
AuthRouter.post('/login',signIn);
AuthRouter.patch('/update',update);
AuthRouter.post('/update/verify', verifyUpdate);
AuthRouter.post('/account/recovery',forgotPassword);
AuthRouter.post('/account/password_reset/confirm', passwordReset);
AuthRouter.post('/logout',signOut);
AuthRouter.delete('/delete',deleteUser);


module.exports = {AuthRouter};