import { combineReducers } from "redux";
import restaurantReducer from "./restaurantsReducer";
import reviewsReducer from "./reviewsReducer";
import profileReducer from "./profileReducer";
import reviewerPagesReducer from "./reviewerPagesReducer";
import UserReducer from "./UserReducer";

const rootReducer = combineReducers({
    restaurants: restaurantReducer, 
    reviews: reviewsReducer,
    profile: profileReducer,
    reviewerPages: reviewerPagesReducer,
    user: UserReducer
});

export default rootReducer;