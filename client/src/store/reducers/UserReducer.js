import { USER_TYPES } from "../actionTypes";

const defaultState = {
    verificationEmail: "",
    user: {}
}

const UserReducer = (state = defaultState, action)=>{
    switch (action.type) {
        case USER_TYPES.STORE_VERIFICATION_EMAIL:
            return {...state, verificationEmail: action.payload.email};
        case USER_TYPES.SAVE_USER_DETAILS:
            return {...state, user: action.payload.data}
        default:
            return state;
    }
}

export default UserReducer;