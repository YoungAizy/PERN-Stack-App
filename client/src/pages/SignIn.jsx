import React, { useState } from 'react'
import BackgroundBowl from '../assets/bowl.jpg'
import { useHistory } from 'react-router'

import databinder from '../apis/databinder'
import FloatingInputField from '../components/styled/FloatingInput'
import Button from '../components/styled/Button'

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loginResponse, setLoginResponse] = useState();
    const history = useHistory()

    const login = async () => {
        loginResponse && setLoginResponse("Attempting Login...");
        const { data } = await databinder.post(`/auth/login`, {
            email, password, type: "login"
        });
        setLoginResponse(data);
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        if (data.accessToken) {
            localStorage.setItem("isAuthenticated", true);
            window.location.pathname = "/dashboard";
        }
    }
    return (
        <div style={{ background: `url(${BackgroundBowl})`, height: "100vh", position: "relative" }}>
            <LoginHeader setShow={setShow} history={history} LoggedIn={false} />
            <h2 className='m-5' style={{ color: "whitesmoke" }}>SIGN-IN</h2>
            <div className="container mb-4 login-page">
                <form>
                    <div>    
                        <FloatingInputField value={email} label={"E-Mail"} inputId="sign_in_Email" inputType="email" placeholder="example@host.com" onInputChanged={setEmail} />
                        <FloatingInputField value={password} inputId="sign_in_password" inputType="password" label={"Password"} placeholder={"password"} onInputChanged={setPassword} />
                       
                        <div className="form-margin"><input type="checkbox" onClick={e => {
                            const x = document.getElementById("sign_in_password");
                            if (x.type === "password") {
                                x.type = "text"
                            } else {
                                x.type = "password"
                            }
                        }} /> Show Password</div>
                        <div>
                            <Button text={"SIGN-IN"} btnType="button" onBtnClick={login} />
                        </div>
                    </div>
                </form>
                {loginResponse && !loginResponse.accessToken && <p style={{ fontWeight: "600", background: "whitesmoke" }}>{loginResponse}</p>}
            </div>
        </div>
    )
}

export const LoginHeader = ({ setShow, history, LoggedIn }) => {

    return (
        <div className="login-header">
            <button className="nav-btn" onClick={() => history.push('/')}>Home</button>
            {LoggedIn ? <button className="nav-btn" onClick={() => history.push('/dashboard')}>DashBoard</button> : <button className="nav-btn" onClick={() => setShow(true)}>SignUp</button>}
        </div>
    )
}

export default SignIn
