import express from 'express';
import { fetchProfile, newProfile, updateProfile,deleteProfile } from '../User-Service/controllers/index.js';

const profileRouter = express.Router();

profileRouter.post('/create',newProfile);
profileRouter.get('/fetch',fetchProfile);
profileRouter.put('/update',updateProfile);
profileRouter.delete('/delete',deleteProfile);

export default profileRouter;