import axios from 'axios';
// import jwtDecode from 'jwt-decode';
import getAccessToken from '../utils/getAccessToken';

const accessToken = getAccessToken();
const databinder = axios.create({
    baseURL: "http://localhost:7009/api/v1/auth",
    withCredentials: true,
    headers: {Authorization: "Bearer " + accessToken || ""}
});
console.log("oop", accessToken);

const authApi = {
    async createUser(payload) {
        const result = await databinder.post('/registration',payload);
        return result;
    },
    async verifyUser(payload) {
        const result = await databinder.post('/registration/verify',payload);
        return result;
    },
    async resendVerificationCode(email){
        const result = await databinder.post('/registration/verify/resend',email);
        return result;
    },
    async signIn(payload) {
        const result = await databinder.post('/login',payload);
        return result;
    },
    async getUser() {
        const result = await databinder.get('/account');
        return result;
    },
    async updateUser(payload) {
        // databinder.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
        console.log(payload);
        console.log("header", databinder.head());
        // databinder.interceptors.request.use(async req=>{
        //     const decoded = jwtDecode(accessToken);
        //     if(decoded.exp < Date.now()/1000){
        //         return req;
        //     }
        //     const accessTokens = await databinder.post('/token/refresh');
        //     localStorage.setItem("tokens", JSON.stringify(accessTokens));
        //     accessToken = accessTokens.AccessToken;
        // });
        const result = await databinder.patch('/update',payload);
        return result;
    },
    async verifyEmailChange(payload) {
        const result = await databinder.post('/update/verify',payload);
        return result;
    },
    async forgotPassword(payload) {
        const result = await databinder.post('/account/recovery',payload);
        return result;
    },
    async resetPassword(payload) {
        const result = await databinder.post('/account/password_reset/confirm',payload);
        return result;
    },
    async signOut(payload) {
        // databinder.defaults.headers.common['Authorization'] = accessToken;
        const result = await databinder.post('/logout', payload);
        return result;
    },
    async deleteUser() {
        const result = await databinder.delete('/delete');
        return result;
    },
    setAccessToken(accessToken){
        databinder.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
        console.log("auth tokens set")
    },
    getInstance(){
        return databinder;
    }
}

export default authApi;