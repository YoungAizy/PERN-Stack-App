import express from 'express';
import { addRestaurant, update, del_Restaurant } from '../controllers/restaurantController.js';
const restaurant_Router = express.Router();

restaurant_Router.post("/add", addRestaurant);
restaurant_Router.put("/:id", update);
restaurant_Router.delete("/:id", del_Restaurant);

export default restaurant_Router;

