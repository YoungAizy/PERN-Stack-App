import express from 'express';
import { fetchProfile, newProfile, updateProfile,deleteProfile, updateImage } from '../controllers/index.js';
import multer from 'multer';
import { getUserId } from '../middleware/getUserId.js';

const profileRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

profileRouter.post('/create', upload.single('avatar'), getUserId, newProfile);
profileRouter.get('/fetch',getUserId ,fetchProfile);
profileRouter.put('/update', getUserId, updateProfile);
profileRouter.put('/update/image', upload.single('avatar'), updateImage, getUserId);
profileRouter.delete('/delete', getUserId,deleteProfile);

export default profileRouter;