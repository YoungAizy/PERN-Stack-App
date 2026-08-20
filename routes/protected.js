import express from 'express';
// import { addRestaurant, update, del_Restaurant, getListings, getListing, updateImg } from '../controllers/restaurants.controller.js';
import { addRestaurant } from '../resolvers/mutations.resolvers'
// import multer from 'multer';

export const restaurant_Router = express.Router();
export const reviewsRouter = express.Router();

// configure multer
// const storage = multer.memoryStorage()
// const upload = multer({ storage: storage });

//RESTAURANT ROUTES
restaurant_Router.post("/publish", addRestaurant);
// restaurant_Router.put("/update/:id", update);
// restaurant_Router.put("/update/image/:id", upload.single('image'), updateImg);
// restaurant_Router.get("/listings", getListings);
// restaurant_Router.get("/listing/:id", getListing);
// restaurant_Router.delete("/del/:id", del_Restaurant);
