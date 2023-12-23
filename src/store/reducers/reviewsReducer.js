import { REVIEWS_TYPES } from "../actionTypes";


const initialState = {
    reviews:[],
    myReviews:[]
}

const reviewsReducer = (state = initialState, action)=>{
    switch (action.type) {
        case REVIEWS_TYPES.RESTAURANT_REVIEWS:
            return {...state, reviews: action.payload.data }
        case REVIEWS_TYPES.NEW_REVIEW:
            return {...state, reviews: [...state.reviews, action.payload.data]}
        case REVIEWS_TYPES.USER_REVIEWS:
            return {...state, myReviews: action.payload.data}
        case REVIEWS_TYPES.DELETE_REVIEW:
            return {
                ...state,
                myReviews: state.myReviews.filter(review => review.id !== action.payload.id)
            }
        default:
            return state;
    }
}

export default reviewsReducer;