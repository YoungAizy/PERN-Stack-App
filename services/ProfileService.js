import { validateProfile, validateUpdate } from "../utils/SchemaValidator.js";
import { mapNewkeys } from "../utils/helper.js";
import { getUserId } from "../middleware/getUserId.js";
import uploadImage, { deleteImage } from "../utils/uploadImage.js";


export default class ProfileService{

    constructor(profileRepo){
        this.profileRepo = profileRepo;
    }

    async createProfile(req){
        console.log("service:", req.file);
        const {data,request_type, accessToken} = req.body;
        console.log(req.body);
        const payload = mapNewkeys(data);
        validateProfile(payload);

        payload.userid = await getUserId({body:{accessToken, request: request_type}});
        console.log("New Payload:", payload)
        
        if(req.file) payload.img_url = await uploadImage(req.file, payload.userid);
        
        const response= {}
        
        const profile = await this.profileRepo.createProfile(payload);
        if(!profile){
            response.message = "Sever error";
            return response;
        }
        response.data = {createdAt: profile.createdAt, username: profile.username, gender: profile.sex,
            city: profile.city, user_type: profile.account_type, d_o_b: profile.dob, 
            companyName: profile.company, companyPosition: profile.position};
        return response;
    }

    async getProfile(req){
        const {userid:id} = req.body;
        console.log(id)

        const profile = await this.profileRepo.getProfile(id);
        return profile;

    }

    async updateImage(req){
        const payload={};
        const userId = req.body.data.userId
        payload.img_url = await uploadImage(req.file, userId);

        if(payload.img_url){
            const profile = await this.profileRepo.updateProfile(payload,userId);
            return profile;
        }
        return;
    }

    async updateProfile(req){
        console.log("Service", req.body.data);
        
        const {data,userid} = req.body;
        const payload = mapNewkeys(data);
        payload.userId = userid;
        console.log(payload);

        validateUpdate(payload);
        const {userId, ...values} = payload;

        const profile = await this.profileRepo.updateProfile(values,userId);
        return profile;
    }

    async deleteProfile(req){
        const {userid} = req.body;

        await deleteImage(userid);

        const result = await this.profileRepo.deleteProfile(userid);
        if (result >= 1) {
            return result;
        }
        
    }
}