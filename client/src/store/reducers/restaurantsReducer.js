import { RESTAURANTS_TYPES } from "../actionTypes";


const initialState = {
    //ann Array of objects where the key is an id of each restaurant
    All: [],
    //This state holds the object of a single restaurant queried from scratch without any partial data passed to it
    Single: {},
    //Holds the partial data to be shown on single page
    Selected:  {},

    TopRated: [],

    MyListings: []}


const restaurantReducer = (state = initialState, action)=>{
    switch (action.type) {
        case RESTAURANTS_TYPES.SAVE_ALL:
            return {
                ...state, 
                All: action.payload.data
            }
        case RESTAURANTS_TYPES.SAVE_TOP_RATED:
            return {
                ...state,
                TopRated: action.payload.data
            }
        case RESTAURANTS_TYPES.SAVE_SELECTED_PARTIAL:
            return {...state, Selected: action.payload.data}
        case RESTAURANTS_TYPES.ADD_TO_PARTIAL:
            return {...state, Selected:{ ...state.Selected, ...action.payload.data}}
            
        case RESTAURANTS_TYPES.USER_LISTINGS:
            return {
                ...state,
                MyListings: action.payload.data
            };
        case RESTAURANTS_TYPES.NEW_USER_LISTING:
            return{
                ...state,
                MyListings: [...state.MyListings, action.payload.data]
            }
        case RESTAURANTS_TYPES.REMOVE_LISTING:
            return{
                ...state,
                MyListings: state.MyListings.filter(listing => listing.id !== action.payload.id )
            }
        default:
            return state;
    }
}

export default restaurantReducer;