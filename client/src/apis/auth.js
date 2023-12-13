const axios = require('axios');

const databinder = axios.create({
    baseURL: "http://localhost:7009/api/v1/auth",
    withCredentials: true
});

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
    async updateUser(payload,accessToken) {
        databinder.defaults.headers.common['Authorization'] = accessToken;
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
    }
}

export default authApi;