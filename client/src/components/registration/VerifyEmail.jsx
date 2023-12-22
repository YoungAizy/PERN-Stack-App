import React, { useState } from 'react';
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import authApi from '../../apis/auth';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import useQuery from '../../hooks/useQuery';
import useCheckType from '../../hooks/useCheckType';
import { deleteVerification } from '../../store/actions/userActions';
import { saveAcessTokens } from '../../utils/getAccessToken';

const VerifyEmail = ({onPageChange, setBackgroundHeight, dispatch}) => {
    const reduxDispatch = useDispatch()
    const verificationParams = useSelector(state=> state.user.verification);
    const email = verificationParams?.email;
    const password = verificationParams?.password;
    const [verificationCode, setVerificationCode] = useState("");
    const [invalid, setInvalid] = useState(false);
    const history = useHistory();
    const query = useQuery();
    const checkUserType = useCheckType();

    // if the email to be verified is not stored in redux, 
    // reroute user to login page to ptompt for an email and reroute them back for verification
    if(!email){
        history.push('/signin');
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

    const cleanup = ()=>{
        reduxDispatch(deleteVerification());
    }

    const verifyEmail = async()=>{
        try {
            const body = requestBody(userRequests.updateEmailVerification, {email, confirmationCode: verificationCode, password, attr: "email" })
            const {data} = await authApi.verifyEmailChange(body);
            console.log("verified",data)
            if(data.accessTokens){
                cleanup();
                saveAcessTokens(data.accessTokens);
                checkUserType(localStorage.getItem("user_type"));
            }
            
        } catch (error) {
            console.log("VERIFY EMAIL ERR:",error);
        }
    }

    const updatePage = ()=>{
        dispatch({type:"Done", step: "step2"});
        dispatch({type:"Active", step: "step3"});
        onPageChange(3);
        setBackgroundHeight('fit-content');
    }
    
    const btnClick = async e =>{
        e.preventDefault();

        if(verificationCode.length < 4){
            setInvalid(true);
            return;
        }

        
        if(query.get("verification_type") === "email_update"){
            verifyEmail();
            return;
        }

        const body = requestBody(userRequests.VERIFICATION,{email, verificationCode});
        try {
            const {data, status} = await authApi.verifyUser(body);
            if(data.ErrorMessage && status === 203){
                console.log(data.ErrorMessage);
                alert(data.ErrorMessage);
                return;
            }
            if(status === 200 && data.accessTokens){
                localStorage.setItem("tokens", JSON.stringify(data.accessTokens));
                if(query.get('type') && (query.get('type') === "update")){
                    const userType = localStorage.getItem('user_type');
                    checkUserType(userType);
                    return;
                }
                localStorage.setItem("isAuthenticated", true);
                console.log("Verification results:",data);// check result.status==200 and result.statusText == "OK"
                cleanup();
                updatePage();
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