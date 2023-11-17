import React, { useState } from 'react'
import { useHistory } from 'react-router'
import BackgroundBowl from '../assets/bowl.jpg'
import RegistrationModal from './RegistrationModal';

const AuthRoutesHeader = (props) => {
  const [showModal, setShowModal] = useState(false);
  const history = useHistory()
  return (
    <div style={{ background: `url(${BackgroundBowl})`, height: "100vh", position: "relative",backgroundColor:"rgba(0,0,0,.4)",backgroundBlendMode:"hard-light" }}>
        <NavBar LoggedIn={false} setShow={setShowModal} history={history} {...props }/>
        <RegistrationModal onClose={() => setShowModal(false) } show={showModal} />
        {props.children}
    </div>
  )
}

const NavBar = ({ setShow, history, LoggedIn, Heading, authOption }) => {

    return (
        <>
        <div className="login-header">
            <button className="nav-btn" onClick={() => history.push('/')}>Home</button>
            {LoggedIn ? <button className="nav-btn" onClick={() => history.push('/dashboard')}>DashBoard</button> : <button className="nav-btn" onClick={() => setShow(true)}>{authOption}</button>}
        </div>
            <h1 style={{ textAlign: "center", color: "whitesmoke", textTransform:"capitalize" }}>{Heading}</h1>
        </>
    )
}


export default AuthRoutesHeader;