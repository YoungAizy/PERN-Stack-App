import React, {useState} from 'react'
import Modal from './styled/Modal';
import FloatingInputField from './styled/FloatingInput';
import requestBody from '../utils/requestBody';
import { userRequests } from '../utils/requestTypes';
import authApi from '../apis/auth';
import getAccessToken from '../utils/getAccessToken';


const UpdatePasswordModal = ({closeModal}) => {
  const [oldPassword, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updating, setUpdating] = useState(false);

  const changePassword = async ()=>{
    setUpdating(true);

    const accessToken = getAccessToken();
    const body = requestBody(userRequests.updatePassword, {oldPassword,newPassword});
    try {
      const result = await authApi.updateUser(body,accessToken);
      console.log("Password update:",result.data);
      if(result.data.unAuthorized){
        alert(result.data.message);
        return;
      }
      alert("Password updated");
      closeModal(false);
    } catch (error) {
      console.log("Password error",error.message);
    }
  }


  return (
    <Modal title={"Update password"} submitBtnText={"Update"} onSubmitClick={changePassword} closeModal={closeModal} containerStyle={{backgroundColor:"coral"}}>
        <FloatingInputField inputId={"old_password"} value={oldPassword} inputType={"password"} label={"Old Password"} placeholder={"Enter Your Password"} onInputChanged={setPassword}  />
        <FloatingInputField inputId={"onew_password"} value={newPassword} inputType={"password"} label={"New Password"} placeholder={"Enter New Password"} onInputChanged={setNewPassword}  />
        {updating && <p className='text-center'>Updating Password...</p>}
    </Modal>
  )
}

export default UpdatePasswordModal;