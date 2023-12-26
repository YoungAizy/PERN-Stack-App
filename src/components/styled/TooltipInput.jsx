import React from 'react'
import { useState } from 'react'
import { usePopper } from 'react-popper';
import "../../styling/inputTooltip.css"

const TooltipInput = ({inputId, value, inputType, label, placeholder, onInputChanged, inputBlur, validationError, children}) => {
    const [toolTip, setTooltip] = useState(null);
    const [referenceElement, setReference] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, toolTip, {placement: "top", modifiers: [ {
        name: 'offset',
        options: {
          offset: [0, 0],
        },
    },] });

    const toggleTooltip = (bool)=>{
        if (bool) {
            toolTip.setAttribute("data-show", true);
        } else {
            toolTip.removeAttribute('data-show');
        }
    }

    const onInputBlur = (bool)=>{
        toggleTooltip(bool);
        inputBlur();
    }

  return (
    <>
        <div className="form-floating form-margin" ref={setReference}>
            <input id={inputId} value={value || ""} type={inputType} className="form-control" placeholder={placeholder} onFocus={()=>toggleTooltip(true)} onBlur={()=>onInputBlur(false)} onChange={e=>onInputChanged(e.target.value)} />
            <label htmlFor={inputId}>{label}</label>
            {validationError && <span className='px-2' style={{color: "red", backgroundColor:"black"}}>Bad Password!</span>}
        </div>
        <div ref={setTooltip} className='z-3 px-4 pt-2 input-tooltip hidden' style={styles.popper} {...attributes.popper} >
            {children}
        </div>
    </>
  )
}

export default TooltipInput