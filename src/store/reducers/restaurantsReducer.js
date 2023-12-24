import { RESTAURANTS_TYPES } from "../actionTypes";


const initialState = {
    //ann Array of objects where the key is an id of each restaurant
    All: [],
    //This state holds the object of a single restaurant queried from scratch without any partial data passed to it
    SingleListing: {},
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
            };
        case RESTAURANTS_TYPES.LISTING_TO_EDIT:
            return{
                ...state,
                SingleListing: action.payload.data
            };
        case RESTAURANTS_TYPES.UPDATE_LISTINGS:
            return{
                ...state,
                MyListings: state.MyListings.map(listing =>{
                    if(listing.id === action.payload.data.id) return action.payload.data;
                    return listing;
                })
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