export default function transferToken(req,res,next){
    const {access_token} = req.query;
    req.body.accessToken = access_token;
    next()
}