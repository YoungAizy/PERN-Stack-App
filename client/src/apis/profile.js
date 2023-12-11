const axios = require('axios');

const databinder = axios.create({
    baseURL: "http://localhost:6001/api/v1/profile"
});
const profileApi= {
    async create(payload) {
      
        // databinder.defaults.headers.common['Authorization'] = accessToken;
        const result = await databinder.post('/create',payload);
        return result;
    },
    async fetch(accessToken){
        const result = await databinder.get(`/fetch?access_token=${accessToken}`);
        return result;
    },//get request
    async update(payload,token){
        const result = await databinder.put('/update/',payload);
        return result;
    },//put request
    async updateImage(payload){
        const result = databinder.put('/update/image', payload);
        return result;
    },
    async delete(token){
        const result = await databinder.delete(`/${token}`);
        return result;
    }//delete request
}

export default profileApi;