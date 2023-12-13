import { USER_TYPES } from "../actionTypes";

const defaultState = {
    verificationEmail: ""
}

const UserReducer = (state = defaultState, action)=>{
    switch (action.type) {
        case USER_TYPES.STORE_VERIFICATION_EMAIL:
            return {...state, verificationEmail: action.payload.email};
    
        default:
            return state;
    }
}

export default UserReducer;