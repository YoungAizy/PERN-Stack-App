import React, {useState} from 'react'
import Modal from './styled/Modal';
import FloatingInputField from './styled/FloatingInput';

const UpdatePasswordModal = ({closeModal}) => {
    const [oldPassword, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

  return (
    <Modal title={"Update password"} submitBtnText={"Update"} closeModal={closeModal} containerStyle={{backgroundColor:"coral"}}>
        <FloatingInputField inputId={"old_password"} value={oldPassword} inputType={"password"} label={"Old Password"} placeholder={"Enter Your Password"} onInputChanged={setPassword}  />
        <FloatingInputField inputId={"onew_password"} value={newPassword} inputType={"password"} label={"New Password"} placeholder={"Enter New Password"} onInputChanged={setNewPassword}  />
    </Modal>
  )
}

export default UpdatePasswordModal;