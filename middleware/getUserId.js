import fetch from 'node-fetch';
import requestType from '../utils/requestType.js';


export const getUserId = async(req,res,next)=>{
    // abort function if request is not from the registration process
    // 

    const {accessToken} = req.body;
    console.log("kkk",accessToken);
    const requestBody = {
        request_type: "get_user",
        data:{
            "custom:userid": "ok"
        }
    }
    const response = await fetch('http://localhost:7009/api/v1/auth/user', {
        method: 'post',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },

    });
    // console.log("Response from Cognito", response);
    const data = await response.json();

    console.log("data",data);
    // const result = data.filter(attr => attr.Name === "custom:userid");
    console.log("result:", data[0].Value);
    req.body.userid =  data[0].Value;
    
    if((req.body.request === requestType.CREATE)) return data[0].Value;
    
    next();
}