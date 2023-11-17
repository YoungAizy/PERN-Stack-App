import express from "express";
import { register, signIn, deleteUser } from "../controllers/AuthController.js";
// import credentialChecker from '../middleware/checkCredentials.js';
const AuthRouter = express.Router();

AuthRouter.post('/registration',register);
AuthRouter.put('/update');
AuthRouter.post('/login',signIn);
// AuthRouter.post('/logout',signOut);
AuthRouter.delete('/:email',deleteUser);


export default AuthRouter;