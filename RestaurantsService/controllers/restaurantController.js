import Repo from '../Repository/restaurant-repo.js';

export const addRestaurant = async (req,res)=>{
    res.json({statust:"success", name:"Ayanda"})
}
export const getOne = async (req,res)=>{ 
    console.log('Hey there')
    const _repo = new Repo();
    _repo.save(req.params.id,(err,data)=>{
        if(err) res.send("LOl");
    })
 }
export const getAll = async (req,res)=>{
    res.json({statust:"success", name:"Ayanda"})
    console.log("Hey you there");
}
export const update = async (req,res) => {}
export const del_Restaurant = async (req,res) => {}