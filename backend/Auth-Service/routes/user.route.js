import express from "express";
import { createProfile, retrieveProfile,updateProfile, removeProfile } from "../controllers/UserController";
const UserRouter = express.Router();


UserRouter.post('/create', createProfile);
UserRouter.route('/:id').get(retrieveProfile).put(updateProfile);
UserRouter.delete('/:id',removeProfile);

export default UserRouter;