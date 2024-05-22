import {jwtDecode} from 'jwt-decode';
import authApi from '../apis/auth';

const interceptor = async (axiosInstance, accessToken)=>{
    if (!accessToken) return;
    axiosInstance.interceptors.request.use(async req=>{
            const decoded = jwtDecode(accessToken);
            if(decoded.exp < Date.now()/1000){
                return req;
            }
            const accessTokens = await authApi.refreshToken();
            localStorage.setItem("tokens", JSON.stringify(accessTokens));
        });
}

export default interceptor;