import React, { useState } from 'react';
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import authApi from '../../apis/auth';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const VerifyEmail = ({onPageChange, setBackgroundHeight, dispatch}) => {
    
    const email = useSelector(state=> state.user.email);
    const [verificationCode, setVerificationCode] = useState("");
    const [invalid, setInvalid] = useState(false);
    const history = useHistory();

    // if the email to be verified is not stored in redux, 
    // reroute user to login page to ptompt for an email and reroute them back for verification
    if(!email){
        history.push('/login');
        return;
    }
    
    const getNewCode = async e=>{
        e.preventDefault();
        try {
            const {data} = await authApi.resendVerificationCode(email);
            data.verified && alert(`Check your inbox`);
        } catch (error) {
            console.log("Error resending verification code", error);
            alert("Couldn't resend code");
        }
    }
    
    const btnClick = async e =>{
        e.preventDefault();

        if(verificationCode.length < 4){
            setInvalid(true);
            return;
        }

        const body = requestBody(userRequests.VERIFICATION,{email, verificationCode});
        try {
            const {data, status} = await authApi.verifyUser(body);
            console.log("V")
            if(data.ErrorMessage && status === 203){
                console.log(data.ErrorMessage);
                alert(data.ErrorMessage);
                return;
            }
            if(status === 200 && data.accessTokens){
                localStorage.setItem("tokens", JSON.stringify(data.accessTokens));
                localStorage.setItem("isAuthenticated", true);
                console.log("Verification results:",data);// check result.status==200 and result.statusText == "OK"
                dispatch({type:"Done", step: "step2"})
                dispatch({type:"Active", step: "step3"})
                onPageChange(3);
                setBackgroundHeight('fit-content');
            }
        } catch (error) {
            console.log("Verification Failed:", error);
            return;
        }
      }

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <p className='form-margin'>Enter the code sent to your Email below.</p>
            <FloatingInputField value={verificationCode} inputId={"signup_verification_code"} inputType={"text"} 
                label={"Verification Code"} placeholder={"Verification code"} onInputChanged={setVerificationCode}  />
            <button className='btn btn-secondary form-margin mt-1' onClick={getNewCode}>Resend</button>
            {invalid && <p className='form-margin ps-2' style={{backgroundColor:"crimson", color:"ghostwhite"}}>Invalid Code length. Try Again.</p>}
            <Button text={"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick}/>
        </form>
    </div>
  )
}

export default VerifyEmail