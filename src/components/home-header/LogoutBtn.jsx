import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import requestBody from '../../utils/requestBody';
import authApi from '../../apis/auth';
import { userRequests } from '../../utils/requestTypes';

const LogoutBtn = ()=>{
    const history = useHistory();
    
    const onLogout = async e=>{
        e.preventDefault();

        const tokens = JSON.parse(localStorage.getItem("tokens"));
        const refreshToken = tokens.RefreshToken;

        const body = requestBody(userRequests.LOGOUT, {refreshToken});

        try {
            await authApi.signOut(body);
            localStorage.clear();
            history.push('/');
        } catch (error) {
            console.log("Signout Error:", error);
        }
    }

    return (
        <nav className='position-absolute start-0 ms-3 z-3 top-0 mt-4'>
            <button className='btn' style={{backgroundColor:"crimson", color:"white"}} onClick={onLogout} >Logout</button>
            </nav>
    )
}

export default LogoutBtn