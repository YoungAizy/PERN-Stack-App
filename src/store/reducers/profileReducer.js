import { PROFILE } from "../actionTypes";

const initialState = { profile: {} }

const profileReducer = (state= initialState, action)=>{
    switch (action.type) {
        case PROFILE.SAVE_PROFILE:
            return{ ...state, profile: action.payload.data}
        case PROFILE.UPDATE_PROFILE:
            return {...state, profile: {...state.profile, ...action.payload.data }}
        case PROFILE.DELETE_PROFILE:
            return{...state, profile: {}}
        default:
            return state;
    }
}

export default profileReducer;