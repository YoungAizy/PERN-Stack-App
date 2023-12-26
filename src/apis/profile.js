const axios = require('axios');

const idToken = localStorage.getItem("idtoken");
const databinder = axios.create({
    baseURL: `${process.env.REACT_APP_API_GATEWAY_URL}/profile/api/v1/profile`,
    withCredentials: true,
    headers: {Authorization: "Bearer " + idToken || ""}
});
const profileApi= {
    async create(payload) {
      
        // databinder.defaults.headers.common['Authorization'] = accessToken;
        const result = await databinder.post('/create',payload);
        return result;
    },
    async fetch(){
        const result = await databinder.get(`/fetch`);
        return result;
    },//get request
    async update(payload){
        const result = await databinder.put('/update/',payload);
        return result;
    },//put request
    async updateImage(payload){
        const result = databinder.put('/update/image', payload);
        return result;
    },
    async delete(){
        const result = await databinder.delete(`/delete`);
        return result;
    },//delete request

    setIdToken(idToken){
        databinder.defaults.headers.common['Authorization'] = "Bearer " + idToken;
    }
}

export default profileApi;