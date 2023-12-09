import React from 'react'

export const TextInput = ({inputId, label, val, inputType, fieldName, placeholder = "", onChangeEvent}) => {
  return (
    <div className="form-margin col-5">
    <label htmlFor={inputId} >{label}</label>
    <input value={val} type={inputType} name={fieldName} id={inputId} className="form-control" placeholder={placeholder} onChange={e=>onChangeEvent(e.target.value)} />
</div>
  )
}

export const HintedLabelInput = ({inputId, label, val, inputType, fieldName, onChangeEvent})=>{

    return(
        <div className="form-margin form-floating">
            <input value={val} type={inputType} name={fieldName} id={inputId} className="form-control" onChange={onChangeEvent} />
            <label htmlFor={inputId} >{label}</label>
        </div>
    )
}
