import Profile from "../../models/Profile.js";
import ProfileRepo from "../../repo/profileRepo.js";
import ProfileService from "../services/ProfileService.js";

const profileRepo = new ProfileRepo(Profile);
const profileService = new ProfileService(profileRepo);

export const newProfile = async (req,res)=>{
    console.log("controller")
    try {
        const results = await profileService.createprofile(req);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
export const fetchProfile = async (req,res)=>{
    console.log("FETCHING")
    try {
        const result = await profileService.getProfile(req);
        res.json({data:result})
    } catch (error) {
        console.log(error)
    }
}
export const updateProfile = async (req,res)=>{
    try {
        const result = await profileService.updateProfile(req);
        res.json({data:result})
    } catch (error) {
        console.log(error)
    }
}
export const deleteProfile = async(req,res)=>{

    profileService.deleteProfile(req).then(result=> result && res.send("Successfuly deleted"))
    .catch(error=> console.log(error));
}