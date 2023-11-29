import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import UserRepo from '../repository/user_repo.js';
import RequestType from '../utils/constants/RequestType.js';
import compare from '../utils/checkRequestType.js';
import signJwt from '../utils/signJwt.js';


export const register = async(req,res)=>{
    console.log("Registration controller");
    if(compare(req.body.request_type, RequestType.LOGIN,res)) return;
    console.log("continuing");
    const repo = req.body.repo;
    const data = req.body.user;
    console.log(data)

    try {
        const result = await repo.insert();

        //create a token and send it back to client in the http header
        if (Object.keys(result).length >= 4) {
            const accessToken = signJwt({userId:result.userid,email:result.email});
            res.json({accessToken: accessToken});
        }else{
            console.log(err);
            res.send("Could not register user. Error uploading info");
        }
    } catch (error) {
        console.log(error);
        res.json({error})
    }
}

export const signIn = (req,res)=>{
    if(compare(req.body.request_type, RequestType.LOGIN,res)) return;

    const {hashedPassword,userId} = req.body.credentials;
    
    try {
        if (bcrypt.compareSync(req.body.data.password, hashedPassword)) {
            
            const accessToken = signJwt({email: req.body.data.email, userId});
            res.send({accessToken});
        } else
            res.send({message:"Incorrect password given."})
    } catch (error) {
        console.log(error);
        res.send({message:"Login Failed"});
    }

}

export const getName = (req,res)=>{
    const {email} = req.body;

    const repo = new UserRepo(new User(email,RequestType.GET_NAME));
    try {
        const result = repo.name;
        res.send(result);
    } catch (error) {
        console.log(error)
    }

}

export const update = async(req,res)=>{
    if(compare(req.body.request_type, RequestType.LOGIN,res)) return;

    const {repo }= req.body;
    let result, accessToken;
console.log("Update Controller")
    const {request_type} = req.body;
    try {
        switch (request_type) {
            case RequestType.updateName:
                result = await repo.update(RequestType.updateName);
                break;
            case RequestType.updateEmail:
                result = await repo.update(RequestType.updateEmail);
                result.email && (accessToken = signJwt({userId:result.userid,email:result.email}));
                break;
            case RequestType.updatePassword:
                const {password,new_password} = req.body.data;

                if(password !== new_password){
                    result = await repo.update(request_type);
                }
                break;
            default:
                console.log("default...")
                //default behavior is updating both name and email
                result = await repo.update(RequestType.UPDATE);
                result.email && (accessToken = signJwt({userId:result.userid,email:result.email}));
                break;
        }
        res.json({data:result,accessToken})//TODO: check result.rowCount == 1
    } catch (error) {
        
    }
}

// export const signOut = (req,res)=>{}
export const deleteUser = async (req,res)=>{
    if(compare(req.body.request_type, RequestType.LOGIN,res)) return;
    const {repo} = req.body;
    
    try {
        const results = await repo.delete();
        if(results.rowCount === 1) res.send("User Deleted");
    } catch (error) {
        console.log(error);
    }
}