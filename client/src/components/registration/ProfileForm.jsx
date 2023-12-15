import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import DoubleSwitch from '../DoubleSwitch';
import DOB from '../DOB';
import FloatingInputField from '../styled/FloatingInput';
import GenderOptions from '../GenderOptions';
import Button from '../styled/Button';
import Avatar from '../styled/Avatar';
import requestBody from '../../utils/requestBody';
import { profileRequests } from '../../utils/requestTypes';
import { profileSchema } from '../../utils/requestObjects';
import profileApi from '../../apis/profile';
import { useDispatch } from 'react-redux';
import { saveProfileDetails } from '../../store/actions/profileActions';

function ProfileForm() {
  const dispatch = useDispatch();

  //username, role(switch), city, country, gender, image, date of birth
  const [isReviewer, setIsReviewer] = useState(true);
  const [picture, setPictureData] = useState(null);
  const [username,setUsername] = useState("");
  const [city, setCity] = useState("Cape Town");
  const [dob,setDob] = useState('');
  const [gender,setGender] = useState("O");
  //companyName, companyPosition(select)
  const [companyName,setCompanyName] = useState('');
  const [position,setPosition] = useState('');
  
  const [transferingData, setTransferingData] = useState(false);

  const history = useHistory();

  const createProfile = async (e)=>{
    e.preventDefault();
    if(transferingData) return;

    console.log("birthday", dob);
    const dateOfBirth = dob || "2015-09-28";
    const userType = isReviewer ? "reviewer":"restaurateur";
    
    const schema = profileSchema(username,gender,dateOfBirth,city,userType,companyName,position);
    const data = requestBody(profileRequests.CREATE, schema);
    
    const form = new FormData();
    form.append('avatar', picture);
    form.append('data',JSON.stringify(data));
    try {
      setTransferingData(true);
      const {data, status} = await profileApi.create(form);
      console.log("Profile Reg Successful", data.data);
      console.log("Status", status);
      setTransferingData(false);
      if(status === 200 && data.data.createdAt){
        dispatch(saveProfileDetails({data: data.data}));
        localStorage.setItem("user_type", data.data.user_type);
        console.log("hello")
        if(data.data.user_type === "reviewer") {
          console.log("is reviewer");
          history.push('/home/notifications');
        }else{
          console.log("ndiyahamba")
          history.push('/dashboard/manage');
        }
      }
    } catch (error) {
      setTransferingData(false);
      console.log("Profile reg Error: ", error);
    }
  }

  return (
    <div className="pb-4">
        <form action="" method="post" className="container mb-4 login-page">
            <Avatar initials={"AM"} bg_color={"orange"} imgId={'reg_img'} setPictureData={setPictureData}/>
            <FloatingInputField value={username} label={"Username"} placeholder={"username"} inputType={"text"} inputId={"reg_username"} onInputChanged={setUsername} />
            <GenderOptions val={gender} onGenderChange={setGender} />
            <DOB monthCol='col-3' yearCol='col-3' setDOB={setDob} />
            <DoubleSwitch LeftTag={'Reviewer'} RightTag={'Restaurateur'} leftClick={setIsReviewer} rightClick={setIsReviewer}/>
            {!isReviewer && <AdminFields companyName={companyName} setCompanyName={setCompanyName} position={position} setPosition={setPosition} /> }
            <p className='form-margin'>Location:</p>
            <FloatingInputField value={city} inputId={"reg_city"} inputType={"text"} label={"City"} placeholder={"city"} onInputChanged={setCity} />
            <Button text={transferingData ? "Wait..":"Create"} btnType={"submit"} placement={"flex-end"} onBtnClick={createProfile} disabled={transferingData} />
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