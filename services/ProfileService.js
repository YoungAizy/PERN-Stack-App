import { validateProfile, validateUpdate } from "../utils/SchemaValidator.js";
import { mapNewkeys } from "../utils/helper.js";
import { getUserId } from "../utils/getUserId.js";
import uploadImage, { deleteImage } from "../utils/uploadImage.js";


export default class ProfileService{

    constructor(profileRepo){
        this.profileRepo = profileRepo;
    }

    async createProfile(req){
        console.log("service:", req.file);

        const {data,request_type, accessToken} = req.body;
        console.log(data);
        const payload = mapNewkeys(data);
        validateProfile(payload);

        payload.userid = await getUserId(accessToken,request_type);
        console.log("New Payload:", payload)
        
        payload.img_url = await uploadImage(req.file, payload.userid);
        const response= {}
        
        const profile = await this.profileRepo.createProfile(payload);
        if(!profile){
            response.message = "Sever error";
            return response;
        }
        response.data = profile;
        return response;
    }

    async getProfile(req){
        const {userid:id} = req.query;
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
        const {data} = req.body;
        const {userid, ...payload} = mapNewkeys(data);
        validateUpdate({...payload, userid})

        const profile = await this.profileRepo.updateProfile(payload,userid);
        return profile;
    }

    async deleteProfile(req){
        const {userid} = req.query;

        await deleteImage(userid);

        const result = await this.profileRepo.deleteProfile(userid);
        if (result >= 1) {
            return result;
        }
        
    }
}