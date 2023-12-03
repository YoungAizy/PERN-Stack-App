import React from 'react'

const Button = ({onBtnClick, text, btnType, bg, placement, disabled = false}) => {
  return (
    <div className={`form-margin ${placement}`}>
      <button type={btnType} onClick={onBtnClick} disabled={disabled}
      className={`btn ${disabled ? "btn-secondary":"bg-primary"}`} 
      style={{color:"white", ...bg}}>
      {text}
      </button>
    </div>
  )
}

export default Button