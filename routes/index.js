import express from 'express';
import { fetchProfile, newProfile, updateProfile,deleteProfile } from '../controllers/index.js';
import multer from 'multer';

const profileRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

profileRouter.post('/create', upload.single('avatar'),newProfile);
profileRouter.get('/fetch',fetchProfile);
profileRouter.put('/update', upload.single('avatar'),updateProfile);
profileRouter.delete('/delete',deleteProfile);

export default profileRouter;