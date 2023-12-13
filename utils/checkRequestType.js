exports.compare = (arg1,arg2,res)=>{
    if(!(arg1 === arg2)) res.status(400).send({message:"Invalid request type"});
    return !(arg1 === arg2);
}