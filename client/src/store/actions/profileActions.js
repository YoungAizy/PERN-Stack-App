import { PROFILE } from "../actionTypes";

export const saveProfileDetails = payload => ({type: PROFILE.SAVE_PROFILE, payload});
export const updateProfileDetails = payload => ({type: PROFILE.UPDATE_PROFILE, payload});
export const deleteProfile = payload => ({type: PROFILE.DELETE_PROFILE, payload});