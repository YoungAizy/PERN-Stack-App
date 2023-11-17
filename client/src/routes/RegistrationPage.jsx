import React, {useState}from 'react';
import AuthRoutesHeader from '../components/AuthRoutesHeader';
import RegistrationProgress from '../components/registration/RegistrationProgress';
import NewUserForm from '../components/registration/NewUserForm';

function RegistrationPage() {
 

    return (
        <AuthRoutesHeader Heading="Create a new account" authOption="Sign-In">
            <RegistrationProgress/>
            <NewUserForm/>
        </AuthRoutesHeader>
    )
}

export default RegistrationPage;