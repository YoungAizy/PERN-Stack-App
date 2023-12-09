import React, { useState } from 'react';
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import authApi from '../../apis/auth';

const VerifyEmail = ({onPageChange, setBackgroundHeight, dispatch}) => {
    const [verificationCode, setVerificationCode] = useState("");
    const [invalid, setInvalid] = useState(false)
    
    
    const btnClick = async e =>{
        e.preventDefault();

        if(verificationCode.length < 4){
            setInvalid(true);
            return;
        }

        const body = requestBody(userRequests.VERIFICATION,{email: "muspacukku@gufum.com", verificationCode});
        try {
            const result = await authApi.verifyUser(body);
            console.log("Verification results:",result);// check result.status==200 and result.statusText == "OK"
        } catch (error) {
            console.log("Verification Failed:", error);
            return;
        }
        dispatch({type:"Done", step: "step2"})
        dispatch({type:"Active", step: "step3"})
        onPageChange(3);
        setBackgroundHeight('fit-content');
      }

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <p className='form-margin'>Enter the code sent to your Email below.</p>
            <FloatingInputField value={verificationCode} inputId={"signup_verification_code"} inputType={"text"} 
                label={"Verification Code"} placeholder={"Verification code"} onInputChanged={setVerificationCode}  />
            {invalid && <p className='form-margin ps-2' style={{backgroundColor:"crimson", color:"ghostwhite"}}>Invalid Code. Try Again.</p>}
            <Button text={"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick}/>
        </form>
    </div>
  )
}

export default VerifyEmail