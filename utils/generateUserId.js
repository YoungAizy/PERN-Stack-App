import { v4 as uuidv4 } from 'uuid';
import Profile from "../models/Profile.js";
import ProfileRepo from "../repo/profileRepo.js";

const profileRepo = new ProfileRepo(Profile);

export default async ()=>{
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