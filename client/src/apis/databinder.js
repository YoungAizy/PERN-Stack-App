const axios = require('axios');

export default axios.create({
    baseURL: "/api/v1"
})