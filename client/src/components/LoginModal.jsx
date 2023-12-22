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
import { storeVerification } from '../store/actions/userActions';
import useCheckType from '../hooks/useCheckType';
import { saveAuth } from '../utils/getAccessToken';


function SignInModal(props) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponse, setServerResponse] = useState();
    const [fetchingProfile, setFetchingProfile] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const checkUserType = useCheckType();

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
            if(status === 200 && data.profile.user_type){
                console.log("hello", data.profile.user_type)
                dispatch(saveProfileDetails({data}));
                // const tokens ={accessToken: data.accessTokens.AccessToken, refreshToken: data.accessTokens.RefreshToken}
                // dispatch(saveTokens({data: tokens}))
                localStorage.setItem("user_type", data.profile.user_type);
                checkUserType(data.profile.user_type);
            }else{
                alert("Unable to process request");
                setFetchingProfile(false);
            }
        } catch (error) {
            console.log("Something went wrong.", error);
            setFetchingProfile(false);
            alert(error.message);
        }
    }

      const verifyUser = async()=>{
        try {
            await authApi.resendVerificationCode(email);
            dispatch(storeVerification({data:{email}}));
            history.push('/registratiion?page=2');
        } catch (error) {
            console.log("Error while resending verification code.");
            console.log("EERR:", error);
        }
    }

    const Login = async () => {
        serverResponse && setServerResponse("Attempting Login...");

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
                saveAuth(data.accessTokens);
                fetchProfile().then( () => {return})
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
