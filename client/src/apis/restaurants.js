const axios = require('axios');

const databinder = axios.create({
    baseURL: "http://localhost:8001/api/v1/restaurants"
});

//PUBLIC ROUTES
export const _public = {
    all: databinder.get('/public/all?req_src=client'),
    async singleAll(id){ 
        const result = await databinder.get(`/public/${id}?details=all`);
        return result;
    },
    async singlePartial(id){
        const result = await databinder.get(`/public/${id}?details=partial`);
        return result;
    }
}

//PROTECTED ROUTES
export const _protected = {
    post: databinder.post('s/protected/publish'),
    async fetchListings(user){
        console.log(user)
        const listings = await databinder.get(`/protected/listings?createdby=${user}`);
        return listings;
    },
    async update(id){
        const result = await databinder.put(`/protected/update/${id}`);
        return result;
    },
    async delete(id){
        const result = await databinder.delete(`/protected/update/${id}`);
        return result;
    }
}