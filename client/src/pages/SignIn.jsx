import React, { useContext, useState } from 'react'
import BackgroundBowl from '../assets/bowl.jpg'
import RegistrationModal from '../components/RegistrationModal'
import { useHistory } from 'react-router'
import { RestaurantsContext } from '../Context API/Context'
import databinder from '../apis/databinder'

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [show, setShow] = useState(false);
    const [loginResponse, setLoginResponse] = useState();
    const { setUser } = useContext(RestaurantsContext);
    const history = useHistory()

    const login = async () => {
        loginResponse && setLoginResponse("Attempting Login...");
        const { data } = await databinder.post(`/auth/login`, {
            email, password, type: "login"
        });
        setLoginResponse(data);
        setUser(data.user)
        localStorage.setItem("token", JSON.stringify(data.accessToken));
        if (data.accessToken) {
            localStorage.setItem("isAuthenticated", true);
            window.location.pathname = "/dashboard";
        }
    }
    return (
        <div style={{ background: `url(${BackgroundBowl})`, height: "100vh", position: "relative" }}>
            <LoginHeader setShow={setShow} history={history} LoggedIn={false} />
            <h1 style={{ textAlign: "center", color: "whitesmoke" }}>RESTAURANT FINDER</h1>
            <RegistrationModal onClose={() => { setShow(false); }} show={show} />
            <div className="container mb-4 login-page">
                <form>
                    <div>
                        <h3 style={{ textAlign: "center" }}>Sign-In</h3>
                        <div className="form-floating form-margin">
                            <input id="userEmail" type="email" className="form-control" placeholder="example@host.com" onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="userEmail">E-Mail</label>
                        </div>
                        <div className="form-floating form-margin">
                            <input id="pass" type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="pass">Password</label>
                        </div>
                        <div className="form-margin"><input type="checkbox" onClick={e => {
                            const x = document.getElementById("pass");
                            if (x.type === "password") {
                                x.type = "text"
                            } else {
                                x.type = "password"
                            }
                        }} /> Show Password</div>
                        <div className="form-margin">
                            <button type="button" className="btn btn-secondary" onClick={login}>LOGIN</button>
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
