import React, {useEffect, useState} from 'react'
import DoubleSwitch from '../DoubleSwitch';
import DOB from '../DOB';
import FloatingInputField from '../styled/FloatingInput';
import GenderOptions from '../GenderOptions';
import Button from '../styled/Button';
import Avatar from '../styled/Avatar';

function ProfileForm() {
    const [isReviewer, setIsReviewer] = useState(true);
    const [picture, getPictureData] = useState(null);
    //username, role(switch), city, country, gender, image, date of birth
    const [username,setUsername] = useState("");
    const [city, setCity] = useState("");
    const [dob,setDob] = useState(null);
    const [gender,setGender] = useState();

    //companyName, position(select)
    const [companyName,setCompanyName] = useState('');
    const [position,setPosition] = useState('');

    const currentYear = (new Date()).getFullYear();
    let startYear = currentYear - 65;

    const populateYears = ()=>{
      let years;
      for (startYear; startYear <= currentYear; startYear++) {
        years = startYear;
      }
      return new Promise(years);
    }

    // useEffect(()=>{
    //   populateYears()
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // },[])

  return (
    <div className="pb-4">
        <form action="" method="post" className="container mb-4 login-page">
            <div className="mb-4 form-margin">
                <input className="form-control" type="file" id="formImg" accept="image/*"
                    onChange={e => getPictureData(e.target)} style={{ display: 'none' }} />
                <label htmlFor="formImg" style={{display:"inline"}} >
                    {picture ? <img id="input-img" src={picture} alt='' />: <Avatar initials={"AM"} bg_color={"orange"} />}
                </label>
            </div>
            <FloatingInputField value={username} label={"Username"} placeholder={"username"} inputType={"text"} inputId={"reg_username"} onInputChanged={setUsername} />
            <GenderOptions />
            <DOB />
            <DoubleSwitch LeftTag={'Reviewer'} RightTag={'Restaurateur'} leftClick={setIsReviewer} rightClick={setIsReviewer}/>
            {!isReviewer && <AdminFields companyName={companyName} setCompanyName={setCompanyName} position={position} setPosition={setPosition} /> }
            <p className='form-margin'>Location:</p>
            <FloatingInputField value={city} inputId={"reg_city"} inputType={"text"} label={"City"} placeholder={"city"} onInputChanged={setCity} />
            <Button text={"Create"} btnType={"submit"} placement={"flex-end"}/>
        </form>
    </div>
  )
}


const AdminFields = ({companyName,setCompanyName, position, setPosition}) => {

  return (
    <div className='row'>
      <div className="col-8">
        <FloatingInputField value={companyName} inputId={"reg_company_name"} label={"Company Name"} inputType={"text"} placeholder={"companyname"} onInputChanged={setCompanyName} />
      </div>
      <div className="col-3 m-auto">
        <select value={position} className='form-select' name="position" title='position' id="position" onChange={e=>setPosition(e.target.value)}>
                <option disabled>Position</option>
                <option value="owner">Owner</option>
                <option value="employee">Employee</option>
        </select>
      </div>
    </div>
  )
}


export default ProfileForm