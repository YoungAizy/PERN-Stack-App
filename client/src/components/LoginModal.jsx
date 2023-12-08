import React, { useState } from 'react';
import databinder from '../apis/databinder';
import FloatingInputField from './styled/FloatingInput';


function SignInModal(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponse, setServerResponse] = useState();

    if (!props.show) {
        return null;
    }

    const Login = async () => {
        serverResponse && setServerResponse("Attempting Registration...");
        const response = await databinder.post(`/auth/signup`, {
            name, password, email, type: 'registration'
        });
        setServerResponse(response.data);
        if (response.data.accessToken) {
    
            localStorage.setItem("token", JSON.stringify(response.data.accessToken));
            localStorage.setItem("isAuthenticated", true);
            window.location.pathname = "/dashboard";
        }

    }

    return (
        <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <div className="container mt-5 mb-4 login-modal reg-form">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="btn close-btn" onClick={props.onClose}>Close</button>
                </div>
                <h2 className='mb-4'>Sign-In</h2>
                <form action="" method="post">
                    <div >
                        <FloatingInputField value={email || ""} inputId="eMail" inputType="email" label={"eMail"} placeholder="name@example.com" onInputChanged={setEmail} />
                        <FloatingInputField value={password} inputId="signin_password" inputType="password" label={"Password"} placeholder='abc' onInputChanged={setPassword} />
                        <button type="button" className="btn btn-dark form-margin" onClick={Login}>SignIn</button>
                        {serverResponse && !serverResponse.accessToken && <p style={{ fontWeight: "600" }}>{serverResponse}</p>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default SignInModal
