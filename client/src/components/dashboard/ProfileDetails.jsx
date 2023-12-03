import React, { useState } from 'react'
import { TextInput } from '../styled/TextInput'
import { useDispatch, useSelector } from 'react-redux';
import GenderOptions from '../GenderOptions';
import DOB from '../DOB';
import Avatar from '../styled/Avatar';
import Button from '../styled/Button';

const ProfileDetails = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state=>state.profile.profile)
    const [username, setUsername] = useState("");
    const [city,setCity] = useState("");

    const trackChanges = (type)=>{
      switch (type) {
        case 'username':
          return setUsername;
          case 'city':
            return setCity;
        default:
          break;
      }
    }
    
  return (
    <div>
        <h4>Profile:</h4>
        <form action="" method="post">
          <Avatar initials={"AMD"} bg_color={"orange"} />
          <TextInput label="Username" inputId="username" val={username} inputType="text" onChangeEvent={()=>trackChanges("username")} fieldName="user_name" />
          <TextInput label={"City"} inputId={"city"} val={"cape town"} inputType={"text"} fieldName={"city"} />
          <GenderOptions />
          <DOB />
          <div className='col-6 text-center mt-4'>
            <Button btnType={"submit"} text={"update"} disabled={true}/>
          </div>
        </form>
    </div>
  )
}

export default ProfileDetails