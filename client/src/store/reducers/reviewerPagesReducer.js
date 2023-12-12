import { REVIEWER_TYPES } from "../actionTypes";

const pageState = {
    activePage: 'yes'
}

const reviewerPagesReducer = (state= pageState,action)=>{
    switch (action.type) {
        case REVIEWER_TYPES.SETPAGE:
            return {...state, activePage: action.data}
        
        default:
            return state;
    }
}

export default reviewerPagesReducer;