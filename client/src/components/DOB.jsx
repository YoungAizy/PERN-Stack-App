import React from 'react'

const DOB = () => {
  return (
    <div className='m-1 row'>
        <p>Birthday:</p>
        <div className='col-2'>
            <select className='form-select' name="dob" id="day">
                <option value="25">25</option>
            </select>
        </div>
        <div className='col-2'>
            <select className='form-select' name="dob" id="month">
                <option value="may">December</option>
            </select>
        </div>
        <div className='col-2'>
            <select className='form-select' name="dob" id="year">
                <option value="1997">1989</option>
            </select>
        </div>
    </div>
  )
}

export default DOB;