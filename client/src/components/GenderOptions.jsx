import React from 'react'
import '../styling/genderOptions.css';

const GenderOptions = ({onGenderChange:setGender}) => {
  return (
    <div className='form-margin gender-group'>
      <p>Gender:</p>
      <div className="form-check form-check-inline">
        <label className='form-check-label' htmlFor="male">Male</label>
        <input className='form-check-input' type="radio"  value="M" name="gender" id="male" onChange={e=>setGender(e.target.value)} />
      </div>
      <div className="form-check form-check-inline" >
        <label className='form-check-label' htmlFor="female">Female</label>
        <input className='form-check-input' type="radio"  value="F" name="gender" id="female" onChange={e=>setGender(e.target.value)} />
      </div>
      <div className="form-check form-check-inline" >
        <label className='form-check-label' htmlFor="other">Other</label>
        <input className='form-check-input' type="radio"  value="O" name="gender" id="other" onChange={e=>setGender(e.target.value)} />
      </div>
    </div>
  )
}

export default GenderOptions;