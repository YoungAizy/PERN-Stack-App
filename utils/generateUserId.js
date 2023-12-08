import { v4 as uuidv4 } from 'uuid';
import Profile from "../models/Profile.js";
import ProfileRepo from "../repo/profileRepo.js";
import requestType from './requestType.js';

const profileRepo = new ProfileRepo(Profile);

export default async (request)=>{
    // abort function if request is not from the registration process
    if(!(request === requestType.CREATE)) return false;
    let userId, exist = true;
      
    while(exist){
        userId = uuidv4();
        try {
            const profile = await profileRepo.getProfile(userId);
            if(profile && (profile === "Profile does not exist")) return userId;
    
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}