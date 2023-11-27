import Repo from '../Repository/restaurant-repo.js';
import reviews_repo from '../Repository/reviews_repo.js';
import constants from '../utils/constants/index.js';
import { onError, onSucess } from '../utils/helper.js';

export const addRestaurant = async (req,res)=>{
    const payload = [req.body.name,req.body.addr_,req.body.price,req.body.description,req.body.created_by,req.body.tel,
        req.body.email,req.body.web,req.body.city,req.body.tel_ext,req.body.img_url]
    try {
        const result = await (new Repo()).save(payload);
        onSucess(res,result.rows[0]);
        
    } catch (error) {
        onError(res,error,constants.upload)
    }
}

export const getOne = async (req,res)=>{ 
    console.log("help")
    try {
        let restaurant;
        const reviews = await reviews_repo.getReviews([req.params.id]);

        if (req.query.details === constants.partial.toLowerCase()) {
            restaurant = await (new Repo()).retrieveOne([req.params.id],req.query.details);
        }else{
            restaurant = await (new Repo()).retrieveOne([req.params.id]);
        }
        res.json({
            status: "Successful",
            restaurant: restaurant.rows[0],
            reviews: reviews.rows
            });
    } catch (error) {
        console.log(error);
        res.json({status:"Failed to Fetch restaurant information", error});
    }
 }

export const getAll = async (req,res)=>{
    console.log(req.query, "all")
    let results = {};
    try {
        const restaurants = await (new Repo()).retrieveAll([req.query.limit]);
        results.restaurants = restaurants.rows;
        if (req.query.req_src === constants.client.toLowerCase()) {
            const top_rated = await (new Repo()).retrieveTopRated();
            results.top_rated = top_rated.rows;
        }

        res.json({status: "Successful", ...results});
    } catch (error) {
        console.log(error)
        res.json({status:"Failed to Fetch restaurants", error});
    }
}
//TODO: fully implement user listings retrieval
export const getListings = async (req, res)=>{
    const token = req.body.access_token;
    try {
        const result = await (new Repo()).getUserListings([req.query.user]);
        onSucess(res,result.rows);
    } catch (error) {
        console.log(error);
        onError(res,error);
    }
}

export const update = async (req,res) => {
    const payload = [req.body.name,req.body.addr_,req.body.price,req.body.description,req.body.created_by,req.body.tel,
        req.body.email,req.body.web,req.body.city,req.body.tel_ext,req.body.img_url,req.params.id]

        try {
            const result = await (new Repo()).update(payload);
            onSucess(res,result.rows[0]);

        } catch (error) {
            console.log(error);
            onError(res,error,constants.update);
        }
}
export const upVote = async (req,res)=>{
        (new Repo()).updateLike([req.params.id])
        .then(results => onSucess(res,results.rows[0].likes))
        .catch(error=>{
            console.log(error);
            onError(res,error);
        });
}

export const downVote = (req,res) =>{
    (new Repo()).updateLike([req.params.id],"REMOVE")
    .then(results=> onSucess(res,results.rows[0].likes))
    .catch(Error => onError(res,Error));

}

export const del_Restaurant = async (req,res) => {
    try {
        const result = await (new Repo()).delete([req.params.id]);
        res.json({status:`${result.command} Successful`})
    } catch (error) {
        console.log(error)
        res.json({status:"An Error Occured", error});
    }
}