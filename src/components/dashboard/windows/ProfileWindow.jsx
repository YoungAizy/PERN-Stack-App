import React from 'react';
import ProfileDetails from '../ProfileDetails';
import UserDetails from '../UserDetails';
import useProfile from '../../../hooks/useProfile';


export default function ProfileWindow(){

    useProfile();

    return(
        <div className='container'>
            <h2 className='mt-3'>Account Page</h2>
            <ProfileDetails />
            <UserDetails />
        </div>
    )
}