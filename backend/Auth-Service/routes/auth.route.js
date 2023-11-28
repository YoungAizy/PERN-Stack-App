import express from "express";
import { register, signIn, deleteUser, update, getName } from "../controllers/AuthController.js";
import checkPassword from "../middleware/checkPassword.js";
import checkCredentials from "../middleware/checkCredentials.js";
import verifyToken from "../middleware/verifyToken.js";
const AuthRouter = express.Router();

AuthRouter.post('/registration',checkCredentials,register);
AuthRouter.post('/login',checkCredentials,signIn);
AuthRouter.patch('/update',verifyToken, checkPassword,update);
AuthRouter.get('/name',verifyToken,getName);
// AuthRouter.post('/logout',signOut);
AuthRouter.delete('/delete',verifyToken,checkPassword,deleteUser);


export default AuthRouter;