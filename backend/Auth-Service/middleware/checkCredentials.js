import User from "../models/User.model.js";
import UserRepo from "../repository/user_repo.js";
import RequestType from "../utils/constants/RequestType.js";
import { v4 as uuidv4 } from 'uuid';

export default async (req, res, next) => {

    const _request = req.body.request_type;
    const {full_name, email,password} = req.body.data;
    const data = { full_name, email:email.toLowerCase(), password:password}

    const user = new User(data);
    const repo = new UserRepo(user);

    let _email, _password, userId;
    if (_request === RequestType.LOGIN) {
        //get email and password from db
        const result = await repo.retrieveCredentials(RequestType.LOGIN);
       
        if (!result) {
            //TODO: res.send() a message saying user doesn't exist on database
            res.send({message:"Email not registered"})
            return;
        }
        _email= result.email;
        _password = result.password;
        userId =result.userid;
        req.body.credentials = {hashedPassword: _password, userId};
        next();
        return
    }
    
    _email = await repo.retrieveCredentials(_request);

    if (_email) {
        res.send("Email already exist in our database. Log in instead.");
        return;
    }
    
    data.userId = userId = uuidv4();
    req.body.user = data;
    next();  
}

// module.exports ={checkUserCreds}

