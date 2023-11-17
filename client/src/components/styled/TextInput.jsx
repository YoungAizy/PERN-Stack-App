import React from 'react'

export const TextInput = () => {
  return (
    <div>TextInput</div>
  )
}

export const HintedLabelInput = ({inputId, label, inputType, fieldName, onChangeEvent})=>{

    return(
        <div className="form-margin form-floating">
            <input type={inputType} name={fieldName} id={inputId} className="form-control" placeholder='type something' onChange={onChangeEvent}/>
            <label htmlFor={inputId} >{label}</label>
        </div>
    )
}
