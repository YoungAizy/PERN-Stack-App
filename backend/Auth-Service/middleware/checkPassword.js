



if (req.body.type === "login" || req.body.type === "update") {
    console.log("hashing password")
    req.hashedPassword = email.rows[0].password;
    req.name = email.rows[0].name;
    req.user = email.rows[0];
}