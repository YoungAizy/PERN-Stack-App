import React from 'react'

const GenderOptions = () => {
  return (
    <div className='form-margin'>
      <p>Gender:</p>
      <div className="form-check form-check-inline">
        <label className='form-check-label' htmlFor="male">Male</label>
        <input className='form-check-input' type="radio"  value="M" name="gender" id="male" />
      </div>
      <div className="form-check form-check-inline" >
        <label className='form-check-label' htmlFor="female">Female</label>
        <input className='form-check-input' type="radio"  value="F" name="gender" id="female" />
      </div>
      <div className="form-check form-check-inline" >
        <label className='form-check-label' htmlFor="other">Other</label>
        <input className='form-check-input' type="radio"  value="O" name="gender" id="other" />
      </div>
    </div>
  )
}

export default GenderOptions;