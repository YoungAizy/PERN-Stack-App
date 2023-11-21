import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../assets/bowl.jpg';
import LoginForm from './LoginForm';
import RegistrationModal from './RegistrationModal';
import ProfileModal from '../components/ProfileModal';

const Header = ({ isDashBoard }) => {
    const [show, setShow] = useState(false);
    const [loginShown, setLoginShown] = useState(false);
    const [profileShown, setProfileShown] = useState(false);
    const isAuthenticated = localStorage.getItem("isAuthenticated");


    const toggle = () => {
        let loginForm = document.getElementById('login');
        loginForm.classList.toggle("show");
        setLoginShown(!loginShown);
    }


    const showProfile = () => {
        let loginForm = document.getElementById('profile');
        loginForm.classList.toggle("profile-show");
        setProfileShown(!profileShown)
    }


    return (
        <header className="home-header" style={{ backgroundImage: `url(${Background})` }}>
            <LoginForm toggle={toggle} />
            <h1 className="font-weight-light display-1 text-center" style={{ color: "coral" }}>Restaurant Finder</h1>
            <div style={{ float: "right" }}>
                {isAuthenticated ? <LoggedInBtns isDashBoard={isDashBoard} setProfileShown={setProfileShown} showProfile={showProfile} />
                    : <SignInButtons setShow={setShow} toggle={toggle} loginShown={loginShown} />}
            </div>
            <RegistrationModal onClose={() => { setShow(false); }} show={show} />
            <ProfileModal profileShown={profileShown} setProfileShown={setProfileShown} />
        </header>
    )
}

const LoggedInBtns = ({ setProfileShown, isDashBoard }) => {
    const history = useHistory();
    return (
        <React.Fragment>
            {isDashBoard ? <nav className="signin"><button onClick={() => history.push('/')} ><i className="fas fa-home"></i> Home</button></nav> :
                <nav className="signin"><button onClick={() => history.push("/dashboard")} > <i className="fas fa-user-cog"></i> DashBoard</button></nav>}|
            <nav className="signin"><button onClick={() => {
                setProfileShown(true)
            }}><i className="fas fa-user"></i> Profile</button></nav>
        </React.Fragment>
    )
}

const SignInButtons = ({ setShow, toggle, loginShown }) => {
    return (
        <React.Fragment>
            <nav className="signin bg-primary"><button onClick={() => setShow(true)} >Signup</button></nav>|
            <nav className="signin bg-primary"><button onClick={() => {
                if (!loginShown)
                    toggle()
            }}>Login</button></nav>
        </React.Fragment>
    )
}

export default Header;