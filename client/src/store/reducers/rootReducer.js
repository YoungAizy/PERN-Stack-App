import { combineReducers } from "redux";
import restaurantReducer from "./restaurantsReducer";
import reviewsReducer from "./reviewsReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
    restaurants: restaurantReducer, 
    reviews: reviewsReducer,
    profile: profileReducer
});

export default rootReducer;