import express from 'express';
import { getOne, getAll} from '../controllers/restaurants.controller.js';

const publicRouter = express.Router();

publicRouter.get('/all', getAll);
publicRouter.get("/:id", getOne);

export default publicRouter;
