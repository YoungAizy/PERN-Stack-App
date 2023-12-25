const jwt = require('jsonwebtoken');

exports.sendTokens = (tokens, res)=>{
    const unixHour = 60000 * 60;
    const dayUnix = unixHour * 24;
    const expirationTime = new Date(Date.now() + dayUnix);

    const {IdToken, ...accessTokens} = tokens;
    const decoded = jwt.decode(IdToken);
    const isVerified = decoded.email_verified;
    res.cookie("idToken", IdToken, {httpOnly: true, sameSite: "lax", expires: expirationTime});
    
    res.json({accessTokens,isVerified});
}