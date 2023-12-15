import { USER_TYPES } from "../actionTypes";

export const storeVerificationEmail = (payload)=> ({type: USER_TYPES.STORE_VERIFICATION_EMAIL,payload});
export const saveUser = payload => ({type: USER_TYPES.SAVE_USER_DETAILS, payload}) 