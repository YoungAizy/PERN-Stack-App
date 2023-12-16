import express from 'express';
import { addRestaurant, update, del_Restaurant, upVote, downVote } from '../controllers/restaurantController.js';
import { new_review, del_review, new_like, dislike, unlike, remove_disLike } from '../controllers/reviewsController.js';
import multer from 'multer';

export const restaurant_Router = express.Router();
export const reviewsRouter = express.Router();

// configure multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

//RESTAURANT ROUTES
restaurant_Router.post("/add", upload.single('image'), addRestaurant);
restaurant_Router.put("/update/:id", update);
restaurant_Router.patch("/upvote/:id",upVote);
restaurant_Router.patch("/downvote/:id",downVote);
restaurant_Router.delete("/del/:id", del_Restaurant);

/** REVIEWS ROUTES */
reviewsRouter.post("/publish", new_review);
reviewsRouter.patch("/like/:id", new_like);
reviewsRouter.patch("/unlike/:id", unlike);
reviewsRouter.patch("/dislike/:id", dislike);
reviewsRouter.patch("/undo_dislike/:id", remove_disLike);
reviewsRouter.delete("/delete/:id", del_review);
