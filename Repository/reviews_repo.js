import db from "../config/index.js";
import {REVIEWS_QUERIES} from "../config/queries.js"

const client = db.getConnection();

export default {
    
    async getReviews(id){
        const result = await client.query(REVIEWS_QUERIES.getReviews,id);
        return result;
    },

    async add_review(review){
        const result = await client.query(REVIEWS_QUERIES.add, review);
        return result;
    },

    async updateLike(id,req_type){
        let result;
        switch (req_type) {
            case "DISLIKE":
                result = await client.query(REVIEWS_QUERIES.disLike,id);
                break;
            case "UNLIKE":
                result = await client.query(REVIEWS_QUERIES.unLike,id);
                break;
            case "REMOVE DISLIKE":
                result = await client.query(REVIEWS_QUERIES.remove_disLike,id);
                break;
            default:
                result = await client.query(REVIEWS_QUERIES.newLike,id);
                break;
        }
        return result;
    },
    
    async remove(id){
        const result = await client.query(REVIEWS_QUERIES.delete, id);
        return result;
    }

}