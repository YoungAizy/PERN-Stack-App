import React, {useEffect, useState} from 'react'
import DoubleSwitch from '../DoubleSwitch';

function ProfileForm() {
    const [picture, getPictureData] = useState(null);
    //username, role(switch), city, country, gender, image, date of birth
    const currentYear = (new Date()).getFullYear();
    let startYear = currentYear - 65;

    const populateYears = ()=>{
      let years;
      for (startYear; startYear <= currentYear; startYear++) {
        years = startYear;
      }
      return new Promise(years);
    }

    useEffect(()=>{
      populateYears()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return (
    <div>
        <form action="" method="post">
            <div style={{ paddingLeft: "0" }} className="col-4 mb-3">
                <input className="form-control" type="file" id="formImg" accept="image/*"
                    onChange={e => getPictureData(e.target)} style={{ display: 'none' }} />
                <label htmlFor="formImg">
                    {picture ? <img id="input-img" src={picture} alt='' />: <span classN>A.M</span>}
                </label>
            </div>
            <div className="form-margin">
                <input type="text" name="" id="" className="" />
                <label htmlFor="">Username</label>
            </div>
            <div className="form-margin">
                Gender
            </div>
            <div className="form-margin">D.O.b</div>
            <div className="form-margin"> <DoubleSwitch LeftTag={'Reviewer'} RightTag={'Restaurateur'} /> </div>
            <div className="form-margin">country</div>
            <div className="form-margin">city</div>
        </form>
    </div>
  )
}


const AdminFields = () => {
    //companyName, position(select)
    const [companyname,setCompanyName] = useState('');
    const [position,setPosition] = useState('');
  return (
    <div>AdminFields</div>
  )
}


export default ProfileForm