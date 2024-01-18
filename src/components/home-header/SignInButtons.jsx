import React from 'react';

const SignInButtons = ({ setShow, history}) => {
    return (
        <div style={{ float: "right" }}>
            <nav className="signin bg-primary"><button onClick={() => history.push({pathname:'/registration',search:'?page=1'})} >Signup</button></nav>|
            <nav className="signin bg-primary"><button onClick={() => setShow(true)}>Login</button></nav>
        </div>
    )
}

export default SignInButtons