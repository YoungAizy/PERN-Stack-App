const db = require("./db");

var namePass = false, emailPass = false;

exports.middleware = async (req, res, next) => {
    console.log("middleware entered!");
    const E_mail = req.body.email;
    console.log(req.body);
    console.log(E_mail);

    const email = await db.query("SELECT * FROM users WHERE email=$1", [escape(E_mail).toLowerCase()]);
    if (email.rowCount >= 1) {
        console.log(email.rows);
        if (req.body.type === "login" || req.body.type === "update") {
            console.log("hashing password")
            req.hashedPassword = email.rows[0].password;
            req.name = email.rows[0].name;
            req.user = email.rows[0];
        } else
            res.send("Email already exist in our database. Log in instead.");
        //next();
    } else {
        emailPass = true;
    }
    if (req.body.type !== "login" && req.body.type !== "update") {
        console.log("checking username")
        const name = req.body.name;
        const result = await db.query("SELECT * FROM users WHERE name=$1", [escape(name).toLowerCase()]);
        if (result.rowCount >= 1) {
            console.log("Username");
            res.send("Username is already Taken. Please choose another one.");
        } else {
            namePass = true;
        }   
    }
   

    if (namePass && emailPass) {
        req.body.pass = "true";
    }

    next();  
}

// module.exports ={checkUserCreds}

