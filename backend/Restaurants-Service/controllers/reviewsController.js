import Repo from "../Repository/reviews_repo.js";
import constants from "../utils/constants/index.js";
import { onError, onSucess } from '../utils/helper.js';

export const user_reviews = async (req,res)=>{
    console.log("user is", req.query.createdby)
    try {
        const results = await Repo.getUserReviews([req.query.createdby]);
        console.log(results)
        onSucess(res,results.rows);
    } catch (error) {
        console.log(error);
        onError(res,error);
    }
}

export const listingReviews = async (req,res)=>{
    let {payload} = req.query;
    payload = JSON.parse(payload)
    console.log("Listing reviews")

    try {
        const result = await Repo.getListingsReviews(payload);
        onSucess(res,result);
    } catch (error) {
        console.log(error)
    }
}

export const new_review = async (req,res)=>{
    console.log("NEW REVIEW",req.body)
    const payload = [req.body.display_picture, req.body.username, req.body.createdAt,req.body.rating,req.body.comment,req.body.restaurant_id]
    try {
        const result = await Repo.add_review(payload);
        onSucess(res,result.rows);
    } catch (error) {
        console.log(error)
        onError(res,error);
    }
}

export const new_like = (req,res)=>{
    Repo.updateLike([req.params.id])
    .then(results=> onSucess(res,results.rows[0].likes))
    .catch(error=> onError(res,error));
}

export const unlike = (req,res)=>{
    Repo.updateLike([req.params.id],"UNLIKE")
    .then(results=> onSucess(res,results.rows[0].likes))
    .catch(error=> onError(res,error));
}

export const dislike = (req,res)=>{
    Repo.updateLike([req.params.id],"DISLIKE")
    .then(results=> onSucess(res,results.rows[0].dislikes))
    .catch(error=> onError(res,error));
}

export const remove_disLike = (req,res)=>{
    Repo.updateLike([req.params.id],"REMOVE DISLIKE")
    .then(results=> onSucess(res,results.rows[0].dislikes))
    .catch(error=> onError(res,error));
}

export const del_review = (req,res)=>{
    Repo.remove([req.params.id])
    .then(result=> onSucess(res))
    .catch(error=> onError(res,error,constants.delete));
}