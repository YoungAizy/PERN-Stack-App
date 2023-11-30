import { RESTAURANTS_TYPES } from "../actionTypes";

export const userListings = payload => ({type: RESTAURANTS_TYPES.USER_LISTINGS, payload});
export const addToUserListings = payload => ({type: RESTAURANTS_TYPES.NEW_USER_LISTING, payload});
export const deleteUserListing = payload => ({type: RESTAURANTS_TYPES.REMOVE_LISTING, payload});
export const saveRestaurants = payload => ({type: RESTAURANTS_TYPES.SAVE_ALL, payload});
export const saveTopRated = payload => ({type: RESTAURANTS_TYPES.SAVE_TOP_RATED, payload});
export const setSelected = payload => ({type: RESTAURANTS_TYPES.SAVE_SELECTED_PARTIAL, payload});
export const addSelectedData = payload => ({type: RESTAURANTS_TYPES.ADD_TO_PARTIAL, payload});