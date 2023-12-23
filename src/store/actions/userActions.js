import { USER_TYPES } from "../actionTypes";

export const storeVerification = (payload)=> ({type: USER_TYPES.STORE_VERIFICATION_DETAILS,payload});
export const deleteVerification = ()=> ({type: USER_TYPES.DELETE_VERIFICATION_DETAILS});
export const saveUser = payload => ({type: USER_TYPES.SAVE_USER_DETAILS, payload});
export const saveTokens = payload => ({type: USER_TYPES.SAVE_TOKENS, payload})