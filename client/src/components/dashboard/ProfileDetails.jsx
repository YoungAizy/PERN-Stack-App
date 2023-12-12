import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import { useDispatch, useSelector } from 'react-redux';
import GenderOptions from '../GenderOptions';
import DOB from '../DOB';
import Avatar from '../styled/Avatar';
import Button from '../styled/Button';
import { updateProfile } from '../../utils/requestObjects';
import requestBody from '../../utils/requestBody';
import { profileRequests } from '../../utils/requestTypes';
import profileApi from '../../apis/profile';

const ProfileDetails = ({ isReviewer = false, inputClasses,dobClasses, genderClasses}) => {
    const dispatch = useDispatch();
    const profile = useSelector(state=>state.profile.profile)
    
    const [username, setUsername] = useState(profile.username);
    const [city,setCity] = useState(profile.city);
    const [gender,setGender] = useState(profile.gender);
    const [dob,setDob] = useState(profile.d_o_b);

    const trackChanges = (type)=>{
      switch (type) {
        case 'username':
          return setUsername;
        case 'city':
          return setCity;
        case 'gender':
          return setGender;
        case 'birthday':
          return setDob;
        default:
          return;
      }
    }

    const onUpdateUser = async e=>{
      e.preventDefault();

      if((username === profile.username) && (city === profile.city) && (gender === profile.gender)){ 
        console.log("nothing", profile.d_o_b);
        console.log(dob)
        return;
      }
      
      console.log("updating....")

      const schema = updateProfile(username,city,dob,gender);
      const body = requestBody(profileRequests.UPDATE, schema);

      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log("tokens:", tokens);
      const accessToken = tokens.AccessToken;
      body.accessToken = accessToken;

      try {
        const result = await profileApi.update(body);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    
  return (
    <div >
        {!isReviewer && <h4>Profile:</h4>}
        <form action="" method="post">
          <Avatar initials={"AMD"} bg_color={"orange"} />
          <TextInput label="Username" inputId="username" val={username} inputType="text" onChangeEvent={trackChanges("username")} fieldName="user_name" additionalClasses={inputClasses} />
          <TextInput label={"City"} inputId={"city"} val={city} inputType={"text"} fieldName={"city"} onChangeEvent={trackChanges("city")} additionalClasses={inputClasses} />
          <GenderOptions onGenderChange={setGender} val={profile.gender} optionalClasses={genderClasses} />
          <DOB setDOB={setDob} parentStyling={dobClasses && dobClasses.parent} 
            yearCol={dobClasses && dobClasses.year} monthCol={dobClasses && dobClasses.month} dayCol={dobClasses && dobClasses.day} />
          <div className={`col-6 text-center mt-4 ${inputClasses}`}>
            <Button btnType={"submit"} text={"update"} onBtnClick={onUpdateUser}/>
          </div>
        </form>
    </div>
  )
}

export default ProfileDetails