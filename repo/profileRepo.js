

export default class ProfileRepo{

    constructor(Profile){
        this.profileModel = Profile;
    }

    async createProfile(payload){
        console.log("profile repo:", payload);
        const result = await this.profileModel.create(payload);
        console.log("done posting repo.")
        return result;
    }

    getProfile(userid){
        console.log("repo")
        return this.profileModel.findOne({where:{userid}})
        .then(profile=> profile ? profile.dataValues: "Profile does not exist");
    }

    updateProfile(new_data,userId){
        console.log("REPO", new_data);
        //TODO: implement update 
        return this.profileModel.update(new_data,{returning: true, plain:true, where: {userid:userId}})
        .then(result=>{
            if (result != null && result.length > 0) {
                return result[1].dataValues;
            }
        });
    }
    async deleteProfile(userid){
        const count = await this.profileModel.destroy({where:{userid}});
        console.log('deleted row(s):',count);
        return count;
    }
}