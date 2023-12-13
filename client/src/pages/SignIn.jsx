import React, { useState } from 'react'
import BackgroundBowl from '../assets/bowl.jpg'
import { useHistory } from 'react-router'
import FloatingInputField from '../components/styled/FloatingInput'
import Button from '../components/styled/Button'
import authApi from '../apis/auth'
import { userRequests } from '../utils/requestTypes'
import requestBody from '../utils/requestBody'
import SigninOverlay from '../components/SigninOverlay'
import { useDispatch } from 'react-redux'
import profileApi from '../apis/profile'
import { saveProfileDetails } from '../store/actions/profileActions'

const SignIn = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginResponse, setLoginResponse] = useState();
    const [fetchingProfile, setFetchingProfile] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const fetchProfile = async ()=>{
        setFetchingProfile(true);
        try {
            const {data,status} = await profileApi.fetch();
            console.log("DATA", data);
            if(data === "Profile does not exist"){
                console.log("rerouting...")
                history.push('/registration?page=3');
                return;
            }
            if(status === 200 && data.user_type){
                dispatch(saveProfileDetails({payload: data}));
                localStorage.setItem("user_type", data.user_type);
                // eslint-disable-next-line default-case
                switch (data.user_type) {
                    case "reviewer":
                        history.push('/dashboard/notifications')
                        break;
                
                    case "restaurateur":
                        history.push('/dashboard/manage');
                        break;
                }
            }else{
                console.log("Unable to process request");
            }
        } catch (error) {
            console.log("Something went wrong.", error);
            setFetchingProfile(false);
        }
    }

    const verifyUser = async()=>{
        await authApi.resendVerificationCode(email);
        history.push('/registratiion?page=2');
    }

    const login = async () => {
        setLoginResponse("Attempting Login...");
        
        const body = requestBody(userRequests.LOGIN, {email,password});
        try {
            const {data, status } = await authApi.signIn(body);
            console.log("Login Results:", data);
            // setLoginResponse(data);
            if(!data.isVerified) verifyUser();
            if (status === 200 && data.accessTokens) {
                localStorage.setItem("tokens", JSON.stringify(data.accessTokens));
                localStorage.setItem("isAuthenticated", true);
                fetchProfile();
                return;
                // window.location.pathname = "/manage";
            }
        } catch (error) {
            console.log("Login Error:",error)
            setLoginResponse("Login Failed. Something went wrong.");
        }
    }
    return (
        <div style={{ background: `url(${BackgroundBowl})`, height: "100vh", position: "relative" }}>
            <LoginHeader history={history} LoggedIn={false} />
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
                {loginResponse && !loginResponse.accessToken && <p className='form-margin px-2' style={{ fontWeight: "600", background: "whitesmoke", color:"black" }}>{loginResponse}</p>}
            </div>
            {fetchingProfile && <SigninOverlay />}
        </div>
    )
}

export const LoginHeader = ({ history, LoggedIn }) => {

    return (
        <div className="login-header">
            <button className="nav-btn" onClick={() => history.push('/')}>Home</button>
            {LoggedIn ? <button className="nav-btn" onClick={() => history.push('/dashboard')}>DashBoard</button> : <button className="nav-btn" onClick={() => history.push('/registration')}>SignUp</button>}
        </div>
    )
}

export default SignIn
