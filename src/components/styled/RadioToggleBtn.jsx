import React from 'react'

const RadioToggleBtn = ({_id, _label, groupName, ...props}) => {
  return (
    <>
        <input type="radio" name={groupName} id={_id} className="btn-check" {...props} />
        <label htmlFor={_id} className='btn btn-primary'>{_label}</label>
    </>
  )
}

export default RadioToggleBtn