exports.compare = (arg1,arg2,res)=>{
    if(!(arg1 === arg2)) res.send("Invalid request type");
    return !(arg1 === arg2);
}