import { combineReducers } from "redux";
import restaurantReducer from "./restaurantsReducer";
import reviewsReducer from "./reviewsReducer";
import profileReducer from "./profileReducer";
import reviewerPagesReducer from "./reviewerPagesReducer";

const rootReducer = combineReducers({
    restaurants: restaurantReducer, 
    reviews: reviewsReducer,
    profile: profileReducer,
    reviewerPages: reviewerPagesReducer
});

export default rootReducer;