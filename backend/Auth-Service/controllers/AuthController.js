import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jose from 'node-jose'
import User from '../models/User.model.js';
import UserRepo from '../repository/user_repo.js';
import RequestType from '../utils/constants/RequestType.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Read signing key from pem file
const privateKey = fs.readFileSync(path.resolve(__dirname,"../certs/private-key.pem"));


export const register = async(req,res)=>{
    console.log("Registration controller");
    const repo = req.body.repo;
    const data = req.body.user;
    console.log(data)

    try {
        const result = await repo.insert();

        //create a token and send it back to client in the http header
        if (Object.keys(result).length >= 4) {
            const user = {userId:result.userid,email:result.email};
            const accessToken = jwt.sign(user, privateKey,{algorithm:"RS256"});
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
    const {hashedPassword,userId} = req.body.credentials;
    
    try {
        if (bcrypt.compareSync(req.body.data.password, hashedPassword)) {
            const token_data = {
                email: req.body.data.email,
                userId //use uuidv4 to create userId durimg signup
            }
            const accessToken = jwt.sign(token_data, privateKey, {algorithm: "RS256"});
            //const encryptedJWT = jose.EncryptJWT();
            res.send({accessToken});
        } else
            res.send({message:"Incorrect password given."})
    } catch (error) {
        console.log(error);
        res.send({message:"Login Failed"});
    }

}

export const getName = async(req,res)=>{
    const {email} = req.body;

    const repo = new UserRepo(new User(email,RequestType.GET_NAME));
    try {
        const result = await repo.name;
        res.send(result);
    } catch (error) {
        console.log(error)
    }

}

export const update = async(req,res)=>{
    const {repo }= req.body;
    let result;
console.log("Update Controller")
    const {request_type} = req.body;
    try {
        switch (request_type) {
            case RequestType.updateName:
                result = await repo.update(RequestType.updateName);
                break;
            case RequestType.updateEmail:
                result = await repo.update(RequestType.updateEmail);
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
                result = await repo.update(RequestType.UPDATE)
                break;
        }
        res.json({data:result})//TODO: check result.rowCount == 1
    } catch (error) {
        
    }
}

// export const signOut = (req,res)=>{}
export const deleteUser = async (req,res)=>{
    const {repo} = req.body;
    
    try {
        const results = await repo.delete();
        if(results.rowCount === 1) res.send("User Deleted");
    } catch (error) {
        console.log(error);
    }
}