import Repo from '../Repository/restaurant-repo.js';
import reviews_repo from '../Repository/reviews_repo.js';
import constants from '../utils/constants/index.js';
import { onError, onSucess } from '../utils/helper.js';
import { v4 as uuidv4 } from 'uuid';
import { mapNewkeys } from '../utils/mapKeys.js';

export const addRestaurant = async (req,res)=>{
    const body = JSON.parse(req.body.data)
    console.log("Body", body);
    let img_url;
    const imageId = uuidv4();
    if(req.file) img_url = await uploadImage(req.file, imageId);

    const payload = [body.name,body.addr_,body.price,body.description,body.createdby,body.tel,
        body.email,body.web,body.city,body.tel_ext, img_url, imageId];
        console.log(payload);
    try {
        const result = await (new Repo()).save(payload);
        onSucess(res,result.rows[0]);
        
    } catch (error) {
        console.log("ERROR uploading:", error)
        onError(res,error,constants.upload);
    }
}

export const getOne = async (req,res)=>{ 
    console.log("help")
    try {
        let restaurant;
        const {rows} = await reviews_repo.getReviews([req.params.id]);
        console.log("Reviews:", rows);
        const reviews = rows.map(mapNewkeys);
        console.log("Updated Reviews:",reviews);

        if (req.query.details === constants.partial.toLowerCase()) {
            restaurant = await (new Repo()).retrieveOne([req.params.id],req.query.details);
        }else{
            restaurant = await (new Repo()).retrieveOne([req.params.id]);
        }
        res.json({
            status: "Successful",
            restaurant: restaurant.rows[0],
            reviews: reviews
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
        const restaurants = await (new Repo()).retrieveAll(req.query.limit);
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

export const getListing = async(req,res)=>{
    const {id} = req.params;
    try {
        const {rows} = await (new Repo()).getUserListing(id);
        res.json(rows[0]);
    } catch (error) {
        console.log("Fetching Listing Error:", error);
        res.send(error);
    }
}
//TODO: fully implement user listings retrieval
export const getListings = async (req, res)=>{
    const token = req.body.access_token;
    console.log("YEBO",req.query.createdby)
    try {
        const result = await (new Repo()).getUserListings(req.query.createdby);
        console.log(result.rows)
        onSucess(res,result.rows);
    } catch (error) {
        console.log(error);
        onError(res,error);
    }
}

export const update = async (req,res) => {
    const payload = [req.body.name,req.body.addr_,req.body.price,req.body.description,req.body.createdby,req.body.tel,
        req.body.email,req.body.web,req.body.city,req.body.tel_ext,req.body.img_url,req.params.id]

        try {
            const result = await (new Repo()).update(payload);
            onSucess(res,result.rows[0]);

        } catch (error) {
            console.log(error);
            onError(res,error,constants.update);
        }
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