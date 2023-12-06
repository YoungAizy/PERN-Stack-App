import User from "../models/User.model.js";
import UserRepo from "../repository/user_repo.js";
import RequestType from "../utils/constants/RequestType.js";
import bcrypt from 'bcryptjs';


export default async(req,res,next)=>{
    const {request_type} = req.body;
    const { data }= req.body;

    const user = new User(data,request_type);
    const repo = new UserRepo(user);
    let hashedPassword;
    try {
        hashedPassword = await repo.retrieveCredentials(RequestType.updatePassword);
        console.log("hashed:", hashedPassword);
        console.log("password:", data.password)

        if (bcrypt.compareSync(data.password, hashedPassword)) {
            req.body.repo = repo;
            next();
            return;
        }else{
            res.send("Incorrect password");
            return;  //res.send() Incorrect password
        }
    } catch (error) {
        console.log(error);
        return; //TODO: respond with incorrect password
    }
}



// if (req.body.type === "login" || req.body.type === "update") {
//     console.log("hashing password")
//     req.hashedPassword = email.rows[0].password;
//     req.name = email.rows[0].name;
//     req.user = email.rows[0];
// }