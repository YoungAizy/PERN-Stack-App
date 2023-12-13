require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');


exports.verifyToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    const parts = bearerHeader.split(' ');
    const token = parts[1];
    

    if (token != null) {
        const decoded = jwt.decode(token, {complete: true});
        
        const client = jwksClient({
            jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`,
            cache: true,
            rateLimit: true,
        });


        const kid = decoded.header.kid;
        const key = await client.getSigningKey(kid);
        const signingKey = key.getPublicKey();
    
        jwt.verify(token, signingKey, { algorithms: ['RS256'] }, (err,data)=>{
            if(err) {
                console.log("Error occured", err);
                res.status(403).json({message: err.message}).end();
                return;
            };
    
            req.body.token = token;
            next();
        })
    }else{
        res.status(400).json({message: "Missing Access Token"});
        return;
    }
}