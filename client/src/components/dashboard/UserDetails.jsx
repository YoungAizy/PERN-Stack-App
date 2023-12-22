import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import Button from '../styled/Button';
import PasswordConfirmationModal from '../PasswordConfirmationModal';
import UpdatePasswordModal from '../UpdatePasswordModal';
import authApi from '../../apis/auth';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { storeVerification } from '../../store/actions/userActions';

const UserDetails = ({ isReviewer, inputClasses}) => {
  const User = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(User.firstname);
  const [surname, setSurname] = useState(User.surname);
  const [showNameUpdateBtn, setShowNameUpdateBtn] = useState(false);
  const [email, setEmail] = useState(User.email);
  const [showEmailUpdateBtn ,setShowEmailUpdateBtn] = useState(false)
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const history = useHistory();

  console.log("USER", User);

  const onNameChange = (value,method) =>{
    method(value);
    setShowNameUpdateBtn(true);
  }

  const onNameUpdate = async()=>{

    const body = requestBody(userRequests.updateName,{firstname:firstName,surname});
    
    try {

      const result = await authApi.updateUser(body);
      console.log("Update Full Name Results:", result);
    } catch (error) {
      console.log("Name Update Error:", error);
    }
  }

  const onEmailChange = value =>{
    setEmail(value);
    setShowEmailUpdateBtn(true);
  }

  const onEmailUpdate = async(password)=>{

    if (email === User.email) {
      console.log("Value is unchanged");
      setShowEmailUpdateBtn(false);
      return
    }

    const body = requestBody(userRequests.updateEmail, {email, password});
    try {
      console.log("TRYIIINGGG...", password);
      const {data} = await authApi.updateUser(body);
      console.log(data);
      if(!data.message){
        dispatch(storeVerification({data:{email,password}}));
        history.push({
          pathname:'/registration',
          search: '?page=2&verification_type=email_update'
      })
      }
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='mt-3'>
        {!isReviewer && <h4 >User:</h4>}
        <div className='d-flex flex-row align-items-center'>
          <div className={`d-flex ${inputClasses}`}>
              <TextInput val={firstName} label={"First Name(s)"} inputType="text" inputId="update_firstName" placeholder='John Doe' onChangeEvent={(val)=>onNameChange(val,setFirstName)}/>
              <TextInput val={surname} label={"Last Name"} inputType="text" inputId="update_surname" placeholder='Smith' onChangeEvent={(val)=>onNameChange(val,setSurname)}/>
          
          </div>
          {showNameUpdateBtn && <UpdateBtn updateClick={onNameUpdate} />}
        </div>
        <div className="d-flex flex-row align-items-center">
          <TextInput val={email} label="Email" inputId={"profile_email"} inputType={"email"} onChangeEvent={onEmailChange} additionalClasses={inputClasses}/>
          {showEmailUpdateBtn && <UpdateBtn updateClick={()=> setShowConfirmationModal(true)} />}
        </div>
        {showConfirmationModal && <PasswordConfirmationModal submit={onEmailUpdate} closeModal={setShowConfirmationModal} />}
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