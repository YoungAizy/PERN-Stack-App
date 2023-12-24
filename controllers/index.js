import Profile from "../models/Profile.js";
import ProfileRepo from "../repo/profileRepo.js";
import ProfileService from "../services/ProfileService.js";
import RequestType from '../utils/requestType.js';

const profileRepo = new ProfileRepo(Profile);
const profileService = new ProfileService(profileRepo);

export const newProfile = async (req,res)=>{
    const body = JSON.parse(req.body.data);
    console.log("New Profile Request:", body );
    if(!(body.request_type === RequestType.CREATE)){
        res.send("Invalid Request");
        return
    }

    console.log("controller")
    try {
        const results = await profileService.createProfile(body,req.file,req.body.userid);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}
export const fetchProfile = async (req,res)=>{
    // if(!(req.body.request_type === RequestType.GET)){
    //     res.send("Invalid Request");
    //     return
    // }

    console.log("FETCHING")
    try {
        const result = await profileService.getProfile(req);
        if(result.createdAt){
            res.json(
                {profile:
                    {username:result.username, gender: result.sex, d_o_b: result.dob, city: result.city, img_url: result.img_url,
                    companyName: result.company, companyPosition: result.position, user_type: result.account_type, createdAt: result.createdAt },
                     user: req.body.user}
                     )
        }else {
            res.send(result);
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
export const updateProfile = async (req,res)=>{
    if(!(req.body.request_type === RequestType.UPDATE)){
        res.send("Invalid Request");
        return
    }
    console.log("Updating...")
    try {
        const result = await profileService.updateProfile(req);
        res.json({data:result})
    } catch (error) {
        console.log(error)
    }
}
export const updateImage = async (req,res)=>{
    try {
        const result = await profileService.updateImage(req);
        if(result) res.send("OK");
    } catch (error) {
        console.log("Image Update Fail:", error);
        res.send(error);
    }
}
export const deleteProfile = async(req,res)=>{
    if(!(req.body.request_type === RequestType.DELETE)){
        res.send("Invalid Request");
        return
    }

    console.log("Delete")
    profileService.deleteProfile(req).then(result=> result && res.send("Successfuly deleted"))
    .catch(error=> console.log(error));
}