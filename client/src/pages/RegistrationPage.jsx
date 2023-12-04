import React, {useState}from 'react';
import AuthRoutesHeader from '../components/AuthRoutesHeader';
import RegistrationProgress from '../components/registration/RegistrationProgress';
import NewUserForm from '../components/registration/NewUserForm';
import ProfileForm from '../components/registration/ProfileForm';

function RegistrationPage() {
    const [height,setHeight] = useState("100vh");
    const [page,setPage] = useState(1);

    return (
        <AuthRoutesHeader Heading="Create a new account" authOption="Sign-In" height={height}>
            <RegistrationProgress/>
            {page === 1 ? <NewUserForm onPageChange={setPage} setBackgroundHeight={setHeight}/> : 
            <ProfileForm onPageChange={setPage} setBackgroundHeight={setHeight} />}
        </AuthRoutesHeader>
    )
}

export default RegistrationPage;