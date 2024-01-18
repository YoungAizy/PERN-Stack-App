import authApi from "../apis/auth";
import {setIdToken} from "../apis/profile";

let tokens = JSON.parse(localStorage.getItem("tokens"));

export const useSession =()=>{
    const storeUser = (fullName = null)=>{
        fullName && sessionStorage.setItem("name", fullName);
        return (imgUrl, username) =>{
            sessionStorage.setItem("img", imgUrl);   
            sessionStorage.setItem("username", username);   
        }
    }

    return storeUser;
}

const useTokens = ()=>{
    const getAccessToken = ()=> tokens?.AccessToken;
    
    const getRefreshToken = ()=> tokens?.RefreshToken;
    
    const saveAuth = (accessTokens, idToken)=>{
        tokens = accessTokens;
        localStorage.setItem("idToken", idToken);
        setIdToken(idToken)
        saveAcessTokens(accessTokens);
        localStorage.setItem("isAuthenticated", true);
        authApi.setAccessToken(getAccessToken());
    }
    
    const saveAcessTokens = (accessTokens)=> localStorage.setItem("tokens", JSON.stringify(accessTokens));
    return {getAccessToken, getRefreshToken, saveAuth, saveAcessTokens};
}

export default useTokens;