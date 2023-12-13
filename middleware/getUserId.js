import 'dotenv/config'
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import requestType from '../utils/requestType.js';


export const getUserId = async(req,res,next)=>{
    // abort function if request is not from the registration process
    // 

    const token = req.cookies.idToken;

    let userId;
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
                res.status(403).json({message: err.message});
                return;
            };
    
            userId = data['custom:userid'];
        })
    }else{
        res.status(400).json({message: "Missing Access Token"});
        return;
    }
    
    if((req.body.request === requestType.CREATE)) return data[0].Value;
    req.body.userid = userId;
    next();
}