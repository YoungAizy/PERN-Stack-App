import axios from 'axios';
import interceptor from '../utils/interceptor';

const tokens = localStorage.getItem("tokens");
const databinder = axios.create({
    baseURL: `${process.env.REACT_APP_AUTH_API}/api/v1/auth`,
    withCredentials: true,
    headers: {Authorization: "Bearer " + tokens?.AccessToken || ""}
});

interceptor(databinder,tokens?.AccessToken);
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
    async updateUser(payload) {
        // databinder.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
        console.log(payload);
        console.log("header", databinder.head());
        
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
    async refreshToken(){
        const accessTokens = await databinder.post('/token/refresh');
        this.setAccessToken(accessTokens.AccessToken);
        return accessTokens;
    },
    setAccessToken(accessToken){
        databinder.defaults.headers.common['Authorization'] = "Bearer " + accessToken;
        console.log("auth tokens set");
    },
    getInstance(){
        return databinder;
    }
}

export default authApi;