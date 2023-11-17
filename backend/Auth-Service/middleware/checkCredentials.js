import User from "../models/User.model";
import UserRepo from "../repository/user_repo";


export default async (req, res, next) => {
    console.log("middleware entered!");
    let emailPass = false;
    const _request = req.body.request_type;
    console.log(req.body);
    const data = { full_name: req.body.data.name, email:escape(req.body.data.email).toLowerCase(), 
        password:req.body.data.password, username: req.body.data.username}
    const user = new User(data);
    const repo = new UserRepo(user);

    const email = await repo.retrieve(_request);
    if (email.rowCount >= 1) {
        console.log(email.rows);
        res.send("Email already exist in our database. Log in instead.");
    
    } else
        emailPass = true;
   
    req.body.passedTest = emailPass;
    req.user = data;
    next();  
}

// module.exports ={checkUserCreds}

