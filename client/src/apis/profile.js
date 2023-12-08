const axios = require('axios');

const databinder = axios.create({
    baseURL: "/api/v1/profile"
});

const profileApi= {
    create: databinder.post('/create')
}

export default profileApi;