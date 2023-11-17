import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import fs from 'fs';
import jose from 'node-jose'
import User from '../models/User.model.js';
import UserRepo from '../repository/user_repo.js';
import RequestType from '../utils/constants/RequestType.js';


export const register = async(req,res,next)=>{
    //don't process anything if e-mail or username already exist in database.
    if(!req.body.passedTest) next();

    try {
        const data = req.user;
        data.hashedPassword = await bcrypt.hash(req.body.password, 8);

        const user = new User(data);
        const repo = new UserRepo(user);
        const result = await repo.insert();
    
        //create a token and send it back to client in the http header
        if (Object.keys(result).length >= 4) {
            const user = {name:result['full_name'],email:result.email};
            const accessToken = jwt.sign(user, "Hello there mister peabody");
            res.json({accessToken: accessToken,user: user});
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
    const privateKey = fs.readFileSync("./certs/private");
    // const user = new User(req.body.data,RequestType.LOGIN);
    // const repo = new UserRepo(user);
    const user = {
        name: "Ayanda M",
        email: 'ayandam@hotmail.com'
    }
    let key;

    try {
        jose.JWK.asKey(privateKey,"pem").
        then(function(result) {
          key = result;
          
        });
        // const accessToken = jwt.sign(user,privateKey);
        // res.send(accessToken);
        // if (bcrypt.compareSync(req.body.password, req.hashedPassword)) {
        //     const user = {
        //         name: req.name,
        //         email: req.body.email
        //     }
        //     const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        //     const encryptedJWT = jose.EncryptJWT();
        //     res.json({
        //         accessToken: accessToken,
        //         user: req.user
        //     });
        // } else
        //     res.send("Password Authentication Failed")
    } catch (error) {
        console.log(error);
        res.send("Login Failed");
    }

}

export const getUserInfo = async(req,res)=>{
    //user sends token to server to get details
    const user = new User(req.body.data,RequestType.UPDATE);
    const repo = new UserRepo(user);
    const result = await repo.retrieve(RequestType.UPDATE);
    res.json({data:result})

}

export const update = async(req,res,next)=>{
    const user = new User()
    const repo = new UserRepo(user)
    let result;

    const {request_type} = req.body;
    try {
        switch (request_type) {
            case RequestType.updateName:
                result = repo.update(RequestType.updateName)
                break;
            case RequestType.updateEmail:
                result = repo.update(RequestType.updateEmail)
                break;
            case RequestType.updatePassword:
                const newPassword = req.body.password;
                passwordUpdate(newPassword);
                break;
            default:
                //default behavior is updating both name and email
                result = repo.update(RequestType.UPDATE)
                break;
        }
        res.json({data:result})
    } catch (error) {
        
    }
}

// export const signOut = (req,res)=>{}
export const deleteUser = (req,res)=>{}

const passwordUpdate = (newPassword,oldPassword)=>{

}