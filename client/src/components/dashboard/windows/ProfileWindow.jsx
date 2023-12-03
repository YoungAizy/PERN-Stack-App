import React from 'react';
import ProfileDetails from '../ProfileDetails';
import UserDetails from '../UserDetails';

export default function ProfilePage(props){

    return(
        <div className='container'>
            <h2>Account Page</h2>
            <ProfileDetails />
            <UserDetails />
        </div>
    )
}