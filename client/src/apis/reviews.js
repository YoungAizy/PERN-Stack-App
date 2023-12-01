import databinder from './databinder';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    post: databinder.post('/reviews/add'),
    async like(id){ 
        const result = await databinder.patch(`/reviews/like/${id}`);
        return result;
    },
    async dislike(id){ 
        const result = await databinder.patch(`/reviews/dislike/${id}`);
        return result;
    },
    async getReviews(identity){ 
        const result = await databinder.get(`/reviews?createdby=${identity}`);
        return result;
    },
    async deleteReview(identity){
        const result = await databinder.delete(`/reviews/delete/${identity}`);
        return result;
    }
}