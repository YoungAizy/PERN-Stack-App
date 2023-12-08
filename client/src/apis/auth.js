const axios = require('axios');

const databinder = axios.create({
    baseURL: "http://localhost:7009/api/v1/auth"
});

const authApi = {
    createUser: databinder.post('/registration'),
    verifyUser: databinder.post('/registration/verify'),
    signIn: databinder.post('/login'),
    getUser: databinder.get('/account'),
    updateUser: databinder.patch('/update'),
    verifyEmailChange: databinder.post('/update/verify'),
    forgotPassword: databinder.post('/account/recovery'),
    resetPassword: databinder.post('/account/password_reset/confirm'),
    signOut: databinder.post('/logout'),
    deleteUser: databinder.delete('/delete')
}

export default authApi;