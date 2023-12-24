const axios = require('axios');

const databinder = axios.create({
    baseURL: "http://localhost:8001/api/v1/reviews"
});

// eslint-disable-next-line import/no-anonymous-default-export
const reviewsApi = {
    async post(payload) {
        const result = await databinder.post('/add',payload);
        return result;
    },
    async like(id){ 
        const result = await databinder.patch(`/like/${id}`);
        return result;
    },
    async dislike(id){ 
        const result = await databinder.patch(`/dislike/${id}`);
        return result;
    },
    async getReviews(identity){ 
        const result = await databinder.get(`/?createdby=${identity}`);
        return result;
    },
    async deleteReview(identity){
        const result = await databinder.delete(`/delete/${identity}`);
        return result;
    }
}

export default reviewsApi;