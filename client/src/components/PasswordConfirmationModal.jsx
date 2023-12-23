import React, { useState } from 'react'
import Modal from './styled/Modal';
import { HintedLabelInput } from './styled/TextInput';

const PasswordConfirmationModal = ({closeModal, submit}) => {
    const [password,setPassword] = useState("");

    const _submit = ()=>{
      console.log("Hello", password);
      submit(password);
    }

  return (
    <Modal title={"Confirm Password"} closeModal={closeModal} onSubmitClick={_submit} submitBtnText={"Confirm"} ruler={true}>
        <HintedLabelInput val={password} inputType={"password"} inputId={"password_check"} label={"Password"} onChangeEvent={setPassword} />
    </Modal>
  )
}

export default PasswordConfirmationModal;