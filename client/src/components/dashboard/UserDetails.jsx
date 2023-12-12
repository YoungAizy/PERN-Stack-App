import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import Button from '../styled/Button';
import PasswordConfirmationModal from '../PasswordConfirmationModal';
import UpdatePasswordModal from '../UpdatePasswordModal';
import authApi from '../../apis/auth';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';

const UserDetails = ({ isReviewer, inputClasses}) => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [showNameUpdate, setShowNameUpdate] = useState(false);
  const [email, setEmail] = useState("");
  const [showEmailUpdate,setShowEmailUpdate] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const onNameChange = value =>{
    // setFullName(value);
    setShowNameUpdate(true);
  }

  const onNameUpdate = async()=>{

    const body = requestBody(userRequests.updateName,{fisrtname:firstName,surname});
    
    try {

      const result = await authApi.updateUser(body);
      console.log("Update Full Name Results:", result);
    } catch (error) {
      console.log("Name Update Error:", error);
    }
  }

  const onEmailChange = value =>{
    setEmail(value);
    setShowEmailUpdate(true);
  }

  const onEmailUpdate = ()=>{

  }
  
  const verifyEmail = (value,state,cb)=>{
    console.log("Clicked")
    if(value === state){
      console.log("Value is unchanged");
      cb(false)
      return;
    }
    // setShowConfirmationModal(true);
  }

  return (
    <div className='mt-3'>
        {!isReviewer && <h4 >User:</h4>}
        <div className='d-flex flex-row align-items-center'>
          <div className={`d-flex ${inputClasses}`}>
              <TextInput value={firstName} label={"First Name(s)"} inputType="text" inputId="update_firstName" placeholder='John Doe' onChangeEvent={setFirstName}/>
              <TextInput value={surname} label={"Last Name"} inputType="text" inputId="update_surname" placeholder='Smith' onChangeEvent={setSurname}/>
          
          </div>
          {showNameUpdate && <UpdateBtn updateClick={onNameUpdate} />}
        </div>
        <div className="d-flex flex-row align-items-center">
          <TextInput val={email} label="Email" inputId={"profile_email"} inputType={"email"} onChangeEvent={onEmailChange} additionalClasses={inputClasses}/>
          {showEmailUpdate && <UpdateBtn updateClick={onEmailUpdate} />}
        </div>
        {/* {showConfirmationModal && <PasswordConfirmationModal closeModal={setShowConfirmationModal} />} */}
        <div className={`col-6 text-center mt-4 ${inputClasses}`}>
            <Button btnType={"button"} text={"update password"} onBtnClick={()=> setShowPasswordModal(true)}/>
        </div>
        {showPasswordModal && <UpdatePasswordModal closeModal={setShowPasswordModal} />}
    </div>
  )
}

const UpdateBtn = ({updateClick})=>{

  return(
    <span className='rounded-pill mt-4' onClick={updateClick}
          style={spanStyle}>update</span>
  )
}

const spanStyle = {
  padding:"6px 14px", 
  color: "white", 
  backgroundColor:"coral", 
  cursor:"pointer"}

export default UserDetails