import { REVIEWS_TYPES } from "../actionTypes";

export const saveSelectedRestaurantReviews = payload => ({type: REVIEWS_TYPES.RESTAURANT_REVIEWS, payload});
export const addReview = payload => ({type: REVIEWS_TYPES.NEW_REVIEW, payload});
export const saveUserReviews = payload => ({type: REVIEWS_TYPES.USER_REVIEWS, payload});
export const deleteReview = payload => ({type: REVIEWS_TYPES.DELETE_REVIEW, payload});