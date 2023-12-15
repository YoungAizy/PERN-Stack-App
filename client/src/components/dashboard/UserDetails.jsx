import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import Button from '../styled/Button';
// import PasswordConfirmationModal from '../PasswordConfirmationModal';
import getAccessToken from '../../utils/getAccessToken';
import UpdatePasswordModal from '../UpdatePasswordModal';
import authApi from '../../apis/auth';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import { useSelector } from 'react-redux';

const UserDetails = ({ isReviewer, inputClasses}) => {
  const User = useSelector(state => state.user.user);

  const [firstName, setFirstName] = useState(User.firstname);
  const [surname, setSurname] = useState(User.surname);
  const [showNameUpdate, setShowNameUpdate] = useState(false);
  const [email, setEmail] = useState(User.email);
  const [showEmailUpdate,setShowEmailUpdate] = useState(false)
  // const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  console.log("USER", User);

  const onNameChange = (value,method) =>{
    method(value);
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

  const onEmailUpdate = async()=>{
    const accessToken = getAccessToken();
    const body = requestBody(userRequests.updateName, {firstname: firstName, surname});
    try {
      const {data} = await authApi.updateUser(body, accessToken);
      console.log(data);
    } catch (error) {
      console.log(error)
    }

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
              <TextInput val={firstName} label={"First Name(s)"} inputType="text" inputId="update_firstName" placeholder='John Doe' onChangeEvent={(val)=>onNameChange(val,setFirstName)}/>
              <TextInput val={surname} label={"Last Name"} inputType="text" inputId="update_surname" placeholder='Smith' onChangeEvent={(val)=>onNameChange(val,setSurname)}/>
          
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