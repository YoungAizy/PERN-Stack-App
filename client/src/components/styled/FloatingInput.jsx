import React from 'react';

const floatingInputField = (props)=>{


    return(
        <div className="form-floating form-margin">
            <input id={props.componentId} type={props.type} className="form-control" placeholder={props.placeholder} onChange={props.onInputChanged} />
            <label htmlFor={props.componentId}>{props.labelName}</label>
        </div>
    )
}

export default floatingInputField;