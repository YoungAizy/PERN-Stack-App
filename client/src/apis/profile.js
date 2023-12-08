const axios = require('axios');

const databinder = axios.create({
    baseURL: "/api/v1/profile"
});

const profileApi= {
    async create(payload) {
        const result = await databinder.post('/create',payload);
        return result;
    }
}

export default profileApi;