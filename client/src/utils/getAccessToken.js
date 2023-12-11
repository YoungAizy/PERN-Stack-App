/* eslint-disable import/no-anonymous-default-export */

export default ()=>{
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    console.log("create function tokens:", tokens);
    const accessToken = tokens.AccessToken;
    
    return accessToken;
}