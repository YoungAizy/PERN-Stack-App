import fetch from 'node-fetch';
import requestType from './requestType.js';


export const updateUser = async(userId,token,request)=>{
    // abort function if request is not from the registration process
    if(!(request === requestType.CREATE)) return false;
    const requestBody = {
        request_type: "update_uuid",
        body:{
            accessToken: token,
            user_id: userId
        }
    }
    const response = await fetch('http://localhost:7009/api/v1/auth/update', {
        method: 'patch',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json'}
    });
    console.log("Response from Cognito", response);
    const data = await response.json();

    console.log(data);
}