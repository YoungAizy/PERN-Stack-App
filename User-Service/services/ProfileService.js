

export default class ProfileService{

    constructor(profileRepo){
        this.profileRepo = profileRepo;
    }

    async createProfile(req){
        console.log("service")
        const {...payload} = req.body.data;
        
        const response= {}
        
        const profile = await this.profileRepo.createProfile(payload);
        if(!profile){
            response.message = "Sever error";
            return response;
        }
        response.data = profile.data.dataValues;
        return response;
    }

    async getProfile(req){
        const {userid:id} = req.query;
        console.log(id)

        const profile = await this.profileRepo.getProfile(id);
        return profile;

    }

    async updateProfile(req){
        console.log("Service", req.body.data);
        const {userid, ...payload} = req.body.data;

        const profile = await this.profileRepo.updateProfile(payload,userid);
        return profile;

    }

    async deleteProfile(req){
        const {userid} = req.query;

        const result = await this.profileRepo.deleteProfile(userid);
        if (result >= 1) {
            return result;
        }
        
    }
}