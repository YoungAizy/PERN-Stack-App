import React, { useEffect, useState } from 'react';
import Months from '../utils/Months';

const DOB = ({setDOB, dayCol = "col-2", monthCol = "col-2", yearCol= "col-2", parentStyling, dob}) => {

    const [days,setDays] = useState([1])
    const [dayOfBirth,setDayOfBirth] = useState(dob?.slice(-2) || '30' );
    const [_month,setMonth] = useState(dob?.slice(5,7) || '01');
    const [years,setYears] = useState([2023]);
    const [selectedYear, setYear] = useState(dob?.slice(0,4) || '2000' );

    const populateDays = ()=>{
        const _days = Months.filter(month => month.val === _month);
        setDays(_days[0].days);
    }
     const currentYear = (new Date()).getFullYear();
    let startYear = currentYear - 65;

    const populateYears = ()=>{
      const _years = []
      for (startYear; startYear <= currentYear; startYear++) {
        _years.push(startYear);
      }
      setYears(_years)
    }

    useEffect(()=>{
      populateYears()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    useEffect(()=>{
        populateDays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[_month]);

    function birthday(){
        const dob = `${selectedYear}-${_month}-${dayOfBirth}`;
        setDOB(dob);
    }
    useEffect(()=>{
        birthday();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[_month, selectedYear,dayOfBirth])

  return (
    <div className={`m-1 row ${parentStyling}`}>
        <p>Birthday:</p>
        <div className={dayCol}>
            <select className='form-select' value={dayOfBirth} name="dob" id="day" onChange={e=>setDayOfBirth(e.target.value)}>
                { days.map( (day,idx) => <option key={idx} value={day} >{day}</option> ) }
            </select>
        </div>
        <div className={monthCol}>
            <select className='form-select' value={_month} name="dob" id="month" onChange={e=>setMonth(e.target.value)}>
                {Months.map(month=><option key={month.month} value={month.val} >{month.month}</option>)}
            </select>
        </div>
        <div className={yearCol}>
            <select className='form-select' value={selectedYear} name="dob" id="year" onChange={e=> setYear(e.target.value)}>
                { years.map((year,idx)=>  <option key={idx} value={year} >{year}</option> ) }
            </select>
        </div>
    </div>
  )
}

export default DOB;