import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import Button from '../styled/Button';
import PasswordConfirmationModal from '../PasswordConfirmationModal';
import UpdatePasswordModal from '../UpdatePasswordModal';

const UserDetails = () => {
  const [fullName, setFullName] = useState("");
  const [showNameUpdate, setShowNameUpdate] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailUpdate,setShowEmailUpdate] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const onNameChange = value =>{
    setFullName(value);
    setShowNameUpdate(true);
  }

  const onEmailChange = value =>{
    setEmail(value);
    setShowEmailUpdate(true);
  }
  
  const confirmPassword = (value,state,cb)=>{
    console.log("Clicked")
    if(value === state){
      console.log("Value is unchanged");
      cb(false)
      return;
    }
    setShowConfirmationModal(true);
  }

  return (
    <div className='mt-3'>
        <h4>User:</h4>
        <div className='d-flex flex-row align-items-center'>
          <TextInput val={fullName} label={"Full Name"} inputId={"full_name"} inputType={"text"} onChangeEvent={onNameChange} />
          {showNameUpdate && <UpdateBtn showModal={()=>confirmPassword(fullName,"Ayanda",setShowNameUpdate)} />}
        </div>
        <div className="d-flex flex-row align-items-center">
          <TextInput val={email} label="Email" inputId={"profile_email"} inputType={"email"} onChangeEvent={onEmailChange} />
          {showEmailUpdate && <UpdateBtn showModal={()=>confirmPassword(email,"abc@g.com",setShowEmailUpdate)} />}
        </div>
        {showConfirmationModal && <PasswordConfirmationModal closeModal={setShowConfirmationModal} />}
        <div className='col-6 text-center mt-4'>
            <Button btnType={"button"} text={"update password"} onBtnClick={()=> setShowPasswordModal(true)}/>
        </div>
        {showPasswordModal && <UpdatePasswordModal closeModal={setShowPasswordModal} />}
    </div>
  )
}

const UpdateBtn = ({showModal})=>{

  return(
    <span className='rounded-pill mt-4' onClick={showModal}
          style={spanStyle}>update</span>
  )
}

const spanStyle = {
  padding:"6px 14px", 
  color: "white", 
  backgroundColor:"coral", 
  cursor:"pointer"}

export default UserDetails