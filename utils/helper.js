
const unixHour = 60000 * 60;
const dayUnix = unixHour * 24;
const expirationTime = Date.now() + dayUnix;

exports.sendTokens = (tokens, res)=>{
    const {IdToken, ...accessToken} = tokens;
    res.cookie("idToken". IdToken, {httpOnly: true, sameSite: "lax", maxAge: expirationTime});
    res.json({accessToken})
}