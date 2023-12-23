/* eslint-disable import/no-anonymous-default-export */

import authApi from "../apis/auth";

let tokens = JSON.parse(localStorage.getItem("tokens"));


const getAccessToken = ()=> tokens?.AccessToken;

export const getRefreshToken = ()=> tokens?.RefreshToken;

export const saveAuth = (accessTokens)=>{
    localStorage.setItem("tokens", JSON.stringify(accessTokens));
    tokens = accessTokens;
    localStorage.setItem("isAuthenticated", true);
    authApi.setAccessToken(getAccessToken());
}

export const saveAcessTokens = (accessTokens)=> localStorage.setItem("tokens", JSON.stringify(accessTokens));

export default getAccessToken;