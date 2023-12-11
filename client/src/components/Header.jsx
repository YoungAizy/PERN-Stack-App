import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../assets/bowl.jpg';


const Header = ({ isDashBoard,setShow }) => {
    const [profileShown, setProfileShown] = useState(false);
    const isAuthenticated = localStorage.getItem("isAuthenticated");


    const showProfile = () => {
        let loginForm = document.getElementById('profile');
        loginForm.classList.toggle("profile-show");
        setProfileShown(!profileShown)
    }


    return (
        <header className="home-header" style={{ backgroundImage: `url(${Background})` }}>
            <h1 className="font-weight-light display-1 text-center" style={{ color: "#ef8a64" }}>Restaurant Finder</h1>
            <div style={{ float: "right" }}>
                {isAuthenticated ? <LoggedInBtns isDashBoard={isDashBoard} setProfileShown={setProfileShown} showProfile={showProfile} />
                    : <SignInButtons setShow={setShow}  />}
            </div>
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

const SignInButtons = ({ setShow}) => {
    const history = useHistory();
    return (
        <>
            <nav className="signin bg-primary"><button onClick={() => history.push('/signup')} >Signup</button></nav>|
            <nav className="signin bg-primary"><button onClick={() => setShow(true)}>Login</button></nav>
        </>
    )
}

export default Header;