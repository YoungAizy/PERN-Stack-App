import express from 'express';
import { addRestaurant, update, del_Restaurant } from '../controllers/restaurantController.js';
import { add_review, del_review } from '../controllers/reviewsController.js';
const restaurant_Router = express.Router();
const reviewsRouter = express.Router();

//RESTAURANT ROUTES
restaurant_Router.post("/add", addRestaurant);
restaurant_Router.put("/:id", update);
restaurant_Router.delete("/:id", del_Restaurant);

/** REVIEWS ROUTES */
reviewsRouter.post("/publish", add_review);
reviewsRouter.delete("/delete", del_review);

export default restaurant_Router;

