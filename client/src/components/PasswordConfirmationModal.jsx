import React, { useState } from 'react'
import Modal from './styled/Modal';
import { HintedLabelInput } from './styled/TextInput';

const PasswordConfirmationModal = ({closeModal}) => {
    const [password,setPassword] = useState("");

  return (
    <Modal title={"Confirm Password"} closeModal={closeModal} submitBtnText={"Confirm"} ruler={true}>
        <HintedLabelInput val={password} inputType={"password"} inputId={"password_check"} label={"Password"} onChangeEvent={setPassword} />
    </Modal>
  )
}

export default PasswordConfirmationModal;