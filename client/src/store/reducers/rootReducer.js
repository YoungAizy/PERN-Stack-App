import { combineReducers } from "redux";
import restaurantReducer from "./restaurantsReducer";
import reviewsReducer from "./reviewsReducer";

const rootReducer = combineReducers({
    restaurants:restaurantReducer, reviews:reviewsReducer
});

export default rootReducer;