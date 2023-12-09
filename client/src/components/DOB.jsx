import React from 'react'

const DOB = ({dayCol = "col-2", monthCol = "col-2", yearCol= "col-2"}) => {
  return (
    <div className='m-1 row'>
        <p>Birthday:</p>
        <div className={dayCol}>
            <select className='form-select' name="dob" id="day">
                <option value="25">25</option>
            </select>
        </div>
        <div className={monthCol}>
            <select className='form-select' name="dob" id="month">
                <option value="may">December</option>
            </select>
        </div>
        <div className={yearCol}>
            <select className='form-select' name="dob" id="year">
                <option value="1997">1989</option>
            </select>
        </div>
    </div>
  )
}

export default DOB;