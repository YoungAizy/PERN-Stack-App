import React from 'react'
import ProfileDetails from '../ProfileDetails';
import UserDetails from '../UserDetails';

const dobStyling = {
    parent: 'col-5 mx-auto',
    year: 'col',
    month: 'col',
    day: 'col'
}

export default function ProfilePage() {
 
  return (
    <div className='col-8 mx-auto pb-3'>
      <h2 className='mt-4 mb-5' >Account</h2>
        <ProfileDetails isReviewer={true} inputClasses={'mx-auto'} dobClasses={dobStyling} genderClasses={'col-5 mx-auto'}/>
        <UserDetails isReviewer={true} inputClasses={'mx-auto'} />
    </div>
  )
}
