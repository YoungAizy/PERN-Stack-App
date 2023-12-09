const axios = require('axios');

const databinder = axios.create({
    baseURL: "/api/v1/profile"
});

const profileApi= {
    async create(payload) {
        const result = await databinder.post('/create',payload);
        return result;
    },
    async fetch(){
        const result = await databinder.get('/fetch');
        return result;
    },//get request
    async update(payload){
        const result = await databinder.put('/update',payload);
        return result;
    },//put request
    async updateImage(payload){
        const result = databinder.put('/update/image', payload);
        return result;
    },
    async delete(userId){
        const result = await databinder.delete(`/${userId}`);
        return result;
    }//delete request
}

export default profileApi;