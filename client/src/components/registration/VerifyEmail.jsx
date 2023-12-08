import React, { useState } from 'react';
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';

const VerifyEmail = ({onPageChange, setBackgroundHeight, dispatch}) => {
    const [verificationCode, setVerificationCode] = useState("");
    
    
    const btnClick = ()=>{
        dispatch({type:"Done", step: "step2"})
        dispatch({type:"Active", step: "step3"})
        onPageChange(3);
        setBackgroundHeight('100%');
      }

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <p className='form-margin'>Enter the code sent to your Email below.</p>
            <FloatingInputField value={verificationCode} inputId={"signup_verification_code"} inputType={"text"} 
                label={"Verification Code"} placeholder={"Verification code"} onInputChanged={setVerificationCode}  />
            <Button text={"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick}/>
        </form>
    </div>
  )
}

export default VerifyEmail