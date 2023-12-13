import React, {useState} from 'react'
import FloatingInputField from '../styled/FloatingInput';
import Button from '../styled/Button';
import authApi from '../../apis/auth';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import { newUser } from '../../utils/requestObjects';

function NewUserForm({onPageChange, setBackgroundHeight, dispatch, signupEmail}) {
    const [firstName, setFirstName] = useState();
    const [surname, setSurname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [invalidSubmit, setInvalidSubmit] = useState(false);
    const [transferingData, setTransferingData] = useState(false);

    const btnClick = async (e)=>{
      e.preventDefault();
      if(transferingData) return;
      if(!(firstName && surname && email && password && confirmPassword)) {
        setInvalidSubmit(true);
        return;
      }
      if(!(password===confirmPassword)){
        alert("Passwords don't match");
        return;
      }

      const body = requestBody(userRequests.REGISTRATION,  newUser(firstName,surname,email,password));
      try {
        setTransferingData(true);
        const user = await authApi.createUser(body);
        console.log("New User:",user); //check result.statusText == "OK" and result.status == 200
        if(user.data.ErrorMessage) {
          console.log(user.data.ErrorMessage);
          alert(user.data.ErrorMessage);
          setTransferingData(false);
          return;
        }
        if(user.status === 200) console.log("OKAY");
      } catch (error) {
        console.log("Something went wrong.",error);
        setTransferingData(false);
        return;
      }
      signupEmail(email);
      dispatch({type:"Done", step: "step1"});
      dispatch({type:"Active", step: "step2"});
      setBackgroundHeight("100vh")
      onPageChange(2);
    }

  return (
    <div className='pb-2'>
        <form className="container mb-4 login-page">
          <div className="d-flex">
            <div className="col-6">
              <FloatingInputField value={firstName} label={"First Name(s)"} inputType="text" inputId="reg_firstName" placeholder='John Doe' onInputChanged={setFirstName}/>
            </div>
            <div className="col-6">
              <FloatingInputField value={surname} label={"Last Name"} inputType="text" inputId="reg_surname" placeholder='Smith' onInputChanged={setSurname}/>
            </div>
          </div>
            <FloatingInputField value={email} inputId="newUserEmail" inputType="email" label={"E-Mail"} placeholder="example@host.com" onInputChanged={setEmail} />
            <FloatingInputField value={password} inputId="reg_password" inputType="password" label={"Password"} placeholder='abc' onInputChanged={setPassword} />
            <FloatingInputField value={confirmPassword} inputId="confirm_passwrd" label={"Confirm Password"} inputType="password" placeholder='abc' onInputChanged={setConfirmPassword} />
            {invalidSubmit && <p className='form-margin ps-2' style={{backgroundColor:"crimson", color:"ghostwhite", textTransform:"uppercase"}}>Fill in all the fields</p>}
            <Button text={transferingData ? "Wait...":"Next"} btnType={"submit"} placement={"flex-end"} onBtnClick={btnClick} disabled={transferingData} />
        </form>
    </div>
  )
}

export default NewUserForm;