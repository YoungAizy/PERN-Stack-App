const jwt = require('jsonwebtoken');
const unixHour = 60000 * 60;
const dayUnix = unixHour * 24;
const expirationTime = Date.now() + dayUnix;

exports.sendTokens = (tokens, res)=>{
    const {IdToken, ...accessTokens} = tokens;
    const decoded = jwt.decode(IdToken);
    const isVerified = decoded.email_verified
    res.cookie("idToken". IdToken, {httpOnly: true, sameSite: "lax", maxAge: expirationTime});
    res.json({accessTokens,isVerified});
}