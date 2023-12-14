import React, { useState } from 'react';
import FloatingInputField from './styled/FloatingInput';
import { userRequests } from '../utils/requestTypes';
import requestBody from '../utils/requestBody';
import authApi from '../apis/auth';
import profileApi from '../apis/profile';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { saveProfileDetails } from '../store/actions/profileActions';
import SigninOverlay from './SigninOverlay';
import { storeVerificationEmail } from '../store/actions/userActions';


function SignInModal(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponse, setServerResponse] = useState();
    const [fetchingProfile, setFetchingProfile] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    if (!props.show) {
        return null;
    }

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
                dispatch(saveProfileDetails({data}));

                localStorage.setItem("tokens", JSON.stringify(data.accessTokens));
                localStorage.setItem("isAuthenticated", true);
                localStorage.setItem("user_type", data.user_type);

                if(data.user_type === "reviewer") {
                    history.push('/home/notifications');
                    return;
                }else{
                    history.push('/dashboard/manage');
                    return;
                }
            }else{
                alert("Unable to process request");
            }
        } catch (error) {
            console.log("Something went wrong.", error);
            setFetchingProfile(false);
            alert(error.message);
        }
    }

      const verifyUser = async()=>{
        dispatch(storeVerificationEmail({email}));
        history.push('/registration?page=2');
    }

    const Login = async () => {
        serverResponse && setServerResponse("Attempting Registration...");

        const body = requestBody(userRequests.LOGIN, {email,password});
        try {
            const {data, status } = await authApi.signIn(body);
            console.log("Login Results:", data);

            if(data.notFound) {
                alert("User Not found. Signup instead");
                return;
            }
            if(data.unAuthorized) {
                alert(data.message);
                return;
            }
            if(!data.isVerified) verifyUser();
            if (status === 200 && data.accessTokens) {
                fetchProfile().then(res => {return})
                // window.location.pathname = "/dashboard/notifications";
            }
        } catch (error) {
            console.log("Something went wrong.", error);
            setServerResponse(false);
        }
    }

    return (
        <>
            <div className='modal z-3' style={{ justifyContent: "space-around"}}>
                <div className="container mt-5 mb-4 login-modal reg-form">
                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button className="btn close-btn" onClick={props.onClose}>Close</button>
                    </div>
                    <h2 className='mb-4'>Sign-In</h2>
                    <form action="" method="post">
                        <div >
                            <FloatingInputField value={email} inputId="eMail" inputType="email" label={"eMail"} placeholder="name@example.com" onInputChanged={setEmail} />
                            <FloatingInputField value={password} inputId="signin_password" inputType="password" label={"Password"} placeholder='abc' onInputChanged={setPassword} />
                            <button type="button" className="btn btn-dark form-margin" onClick={Login} disabled={serverResponse}>SignIn</button>
                            {serverResponse && !serverResponse.accessToken && <p style={{ fontWeight: "600" }}>{serverResponse}</p>}
                        </div>
                    </form>
                </div>
            </div>
            {fetchingProfile && <SigninOverlay /> }
        </>
    )
}

export default SignInModal
