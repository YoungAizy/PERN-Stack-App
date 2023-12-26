import React, { useEffect, useState } from 'react';
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
import useTokens from '../../hooks/useTokens';

const VerifyEmail = ({onPageChange, setBackgroundHeight, dispatch}) => {
    const reduxDispatch = useDispatch()
    const verificationParams = useSelector(state=> state.user.verification);
    const email = verificationParams?.email;
    const password = verificationParams?.password;

    const [verificationCode, setVerificationCode] = useState("");
    const [invalid, setInvalid] = useState(false);
    const [onTransmission, setOnTransmission] = useState(false);
    const [seconds, setSeconds] = useState(60);
    const [resendDisabled, setResendDisabled] = useState(true);

    const history = useHistory();
    const query = useQuery();
    const checkUserType = useCheckType();
    const tokens = useTokens();

    // if the email to be verified is not stored in redux, 
    // reroute user to login page to ptompt for an email and reroute them back for verification
    if(!email){
        history.push('/signin');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>cleanup,[])

    useEffect(()=>{
        if(seconds <= 0){
            setResendDisabled(false);
            return;
        }

        const resendTimeOut = setInterval(()=>{ 
            setSeconds( prevSecs => prevSecs-1)
        }, 1000);

        return ()=> clearInterval(resendTimeOut);
    },[seconds])

    const getNewCode = async e=>{
        e.preventDefault();
        setResendDisabled(true);
        setSeconds(60);
        try {
            const {data} = await authApi.resendVerificationCode(email);
            console.log(data);
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
        setOnTransmission(true);
        try {
            const body = requestBody(userRequests.updateEmailVerification, {email, confirmationCode: verificationCode, password, attr: "email" })
            const {data} = await authApi.verifyEmailChange(body);
            console.log("verified",data)
            if(data.accessTokens){
                cleanup();
                tokens.saveAcessTokens(data.accessTokens);
                checkUserType(localStorage.getItem("user_type"));
            }
            
        } catch (error) {
            console.log("VERIFY EMAIL ERR:",error);
        }
    }

    const updatePage = ()=>{
        setBackgroundHeight('fit-content');
        dispatch({type:"Done", step: "step2"});
        dispatch({type:"Active", step: "step3"});
        onPageChange(3);
    }
    
    const btnClick = async e =>{
        e.preventDefault();
   
        // updatePage();
        if(verificationCode.length < 4){
            setInvalid(true);
            return;
        }

        setResendDisabled(true);
        if(query.get("verification_type") === "email_update"){
            verifyEmail();
            return;
        }

        const body = requestBody(userRequests.VERIFICATION,{email, verificationCode});
        try {
            setOnTransmission(true);
            const {data, status} = await authApi.verifyUser(body);
            if(data.ErrorMessage && status === 203){
                setOnTransmission(false);
                console.log(data.ErrorMessage);
                alert(data.ErrorMessage);
                return;
            }
            if(status === 200 && data.accessTokens){

                if(query.get('type') && (query.get('type') === "update")){
                    const userType = localStorage.getItem('user_type');
                    checkUserType(userType);
                    return;
                }
                tokens.saveAuth(data.accessTokens, data.idTokens)
                console.log("Verification results:",data);// check result.status==200 and result.statusText == "OK"
                
            }
        } catch (error) {
            setOnTransmission(false);
            console.log("Verification Failed:", error);
            return;
        }
        updatePage();
      }

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <p className='form-margin'>Enter the code sent to your Email below.</p>
            <FloatingInputField value={verificationCode} inputId={"signup_verification_code"} inputType={"text"} 
                label={"Verification Code"} placeholder={"Verification code"} onInputChanged={setVerificationCode}  />
            <div>
                <button className='btn btn-secondary form-margin mt-1' onClick={getNewCode} disabled={resendDisabled}>Resend</button>
                <span style={{color: "white", paddingBottom:"1.2rem"}}>{seconds}</span>
            </div>
            {invalid && <p className='form-margin ps-2' style={{backgroundColor:"crimson", color:"ghostwhite"}}>Invalid Code length. Try Again.</p>}
            <Button text={"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick} disabled={onTransmission}/>
        </form>
    </div>
  )
}

export default VerifyEmail