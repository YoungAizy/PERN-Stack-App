import React from 'react';

const FloatingInputField = ({inputId, value, inputType, label, placeholder, onInputChanged})=>{


    return(
        <div className="form-floating form-margin">
            <input id={inputId} value={value || ""} type={inputType} className="form-control" placeholder={placeholder} onChange={e=>onInputChanged(e.target.value)} />
            <label htmlFor={inputId}>{label}</label>
        </div>
    )
}

export default FloatingInputField;