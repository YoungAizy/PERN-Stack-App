import React, {useState} from 'react'
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';

function NewUserForm({onPageChange, setBackgroundHeight, dispatch}) {
    const [fullName, setFullName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const btnClick = ()=>{
      dispatch({type:"Done", step: "step1"});
      dispatch({type:"Active", step: "step2"})
      onPageChange(2);
    }

  return (
    <div>
        <form action="" method="post" className="container mb-4 login-page">
            <FloatingInputField value={fullName} label={"Full Name"} inputType="text" inputId="reg_fullName" placeholder='John Doe' onInputChanged={setFullName}/>
            <FloatingInputField value={email} inputId="newUserEmail" inputType="email" label={"E-Mail"} placeholder="example@host.com" onInputChanged={setEmail} />
            <FloatingInputField value={password} inputId="reg_password" inputType="password" label={"Password"} placeholder='abc' onInputChanged={setPassword} />
            <FloatingInputField value={confirmPassword} inputId="confirm_passwrd" label={"Confirm Password"} inputType="password" placeholder='abc' onInputChanged={setConfirmPassword} />
            <Button text={"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick}/>
        </form>
    </div>
  )
}

export default NewUserForm;