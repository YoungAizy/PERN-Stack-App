import express from 'express';
import { addRestaurant, update, del_Restaurant, getListings, getListing } from '../controllers/restaurantController.js';
import { new_review, user_reviews, listingReviews, del_review, new_like, dislike, unlike, remove_disLike } from '../controllers/reviewsController.js';
import multer from 'multer';

export const restaurant_Router = express.Router();
export const reviewsRouter = express.Router();

// configure multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

//RESTAURANT ROUTES
restaurant_Router.post("/publish", upload.single('image'), addRestaurant);
restaurant_Router.put("/update/:id", update);
restaurant_Router.get("/listings", getListings);
restaurant_Router.get("/listing/:id", getListing);
restaurant_Router.delete("/del/:id", del_Restaurant);

/** REVIEWS ROUTES */
reviewsRouter.post("/add", new_review);
reviewsRouter.patch("/like/:id", new_like);
reviewsRouter.patch("/unlike/:id", unlike);
reviewsRouter.patch("/dislike/:id", dislike);
reviewsRouter.patch("/undo_dislike/:id", remove_disLike);
reviewsRouter.get("/",user_reviews);
reviewsRouter.get("/listings", listingReviews);
reviewsRouter.delete("/delete/:id", del_review);