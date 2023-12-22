import { USER_TYPES } from "../actionTypes";

const defaultState = {
    verification : {
        email: "",
        password: ""
    },
    user: {},
    tokens:{
        accessToken: (localStorage.getItem("tokens") && JSON.parse(localStorage.getItem("tokens"))["AccessToken"]) || null,
        refreshToken: null,
    }
}

const UserReducer = (state = defaultState, action)=>{
    switch (action.type) {
        case USER_TYPES.STORE_VERIFICATION_DETAILS:
            return {...state, verification: action.payload.data};
        case USER_TYPES.DELETE_VERIFICATION_DETAILS:
            return {...state, verification: {}};
        case USER_TYPES.SAVE_USER_DETAILS:
            return {...state, user: action.payload.data};
        case USER_TYPES.SAVE_TOKENS:
            return {...state, tokens: action.payload.data};
        default:
            return state;
    }
}

export default UserReducer;