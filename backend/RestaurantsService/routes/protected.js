import express from 'express';
import { addRestaurant, update, del_Restaurant, upVote, downVote, getListings } from '../controllers/restaurantController.js';
import { new_review, del_review, new_like, dislike, unlike, remove_disLike, user_reviews, listingReviews } from '../controllers/reviewsController.js';
export const restaurant_Router = express.Router();
export const reviewsRouter = express.Router();

//RESTAURANT ROUTES
restaurant_Router.post("/publish", addRestaurant);
restaurant_Router.put("/update/:id", update);
restaurant_Router.patch("/upvote/:id",upVote);
restaurant_Router.patch("/downvote/:id",downVote);
restaurant_Router.get("/listings", getListings);
restaurant_Router.delete("/del/:id", del_Restaurant);

/** REVIEWS ROUTES */
reviewsRouter.post("/add", new_review);
reviewsRouter.patch("/like/:id", new_like);
reviewsRouter.patch("/unlike/:id", unlike);
reviewsRouter.patch("/dislike/:id", dislike);
reviewsRouter.patch("/undo_dislike/:id", remove_disLike);
reviewsRouter.get("/reviews",user_reviews);
reviewsRouter.get("/listings", listingReviews);
reviewsRouter.delete("/delete/:id", del_review);
