import { PROFILE } from "../actionTypes";

export const saveProfileDetails = payload => ({type: PROFILE.SAVE_PROFILE, data: payload});
export const updateProfileDetails = payload => ({type: PROFILE.UPDATE_PROFILE, data: payload});
export const deleteProfile = payload => ({type: PROFILE.DELETE_PROFILE, data: payload});