import React from 'react';

const SignInButtons = ({ setShow, history}) => {
    return (
        <nav style={{ float: "right" }}>
            <button className="signin bg-primary" 
            onClick={() => history.push({pathname:'/registration',search:'?page=1'})} >
                Signup
            </button>
            <button className="signin bg-primary" 
            onClick={() => setShow(true)}>
                Login
            </button>
        </nav>
    )
}

export default SignInButtons