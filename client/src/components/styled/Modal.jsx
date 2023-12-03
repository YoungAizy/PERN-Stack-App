import React from 'react'
import Button from './Button';

const Modal = ({title,children, closeModal, onSubmitClick, submitBtnText, containerStyle, ruler=false}) => {
  console.log(containerStyle)
  return (
    <div className='modal z-3' style={{backgroundColor:"rgba(0,0,0,.3)"}}>
      <div className="modal-content" style={containerStyle}>
        <div className="modal-container">
          <h2>{title}</h2>
          {ruler && <hr />}
          {children}
          <div className='btns-wrapper'>
              <Button text={"Cancel"} onBtnClick={()=>closeModal(false)} btnType={"button"} bg={{backgroundColor:"crimson !important"}} />
              <Button text={submitBtnText} onBtnClick={onSubmitClick} btnType={"button"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;