import express from 'express';
import { fetchProfile, newProfile, updateProfile,deleteProfile, updateImage } from '../controllers/index.js';
import multer from 'multer';
import { getUserId } from '../middleware/getUserId.js';
import transferToken from '../middleware/transferToken.js';

const profileRouter = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

profileRouter.post('/create', upload.single('avatar'),newProfile, getUserId);
profileRouter.get('/fetch',transferToken , getUserId ,fetchProfile);
profileRouter.put('/update', getUserId, updateProfile);
profileRouter.put('/update/image', upload.single('avatar'), updateImage, getUserId);
profileRouter.delete('/delete', transferToken, getUserId,deleteProfile);

export default profileRouter;