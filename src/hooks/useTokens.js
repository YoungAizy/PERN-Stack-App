import authApi from "../apis/auth";
import profileApi from "../apis/profile";

let tokens = JSON.parse(localStorage.getItem("tokens"));

const useTokens = ()=>{
    const getAccessToken = ()=> tokens?.AccessToken;
    
    const getRefreshToken = ()=> tokens?.RefreshToken;
    
    const saveAuth = (accessTokens, idToken)=>{
        localStorage.setItem("tokens", JSON.stringify(accessTokens));
        localStorage.setItem("idToken", idToken);
        tokens = accessTokens;
        localStorage.setItem("isAuthenticated", true);
        authApi.setAccessToken(getAccessToken());
        profileApi.setIdToken(idToken)
    }
    
    const saveAcessTokens = (accessTokens)=> localStorage.setItem("tokens", JSON.stringify(accessTokens));
    return {getAccessToken, getRefreshToken, saveAuth, saveAcessTokens};
}

export default useTokens;