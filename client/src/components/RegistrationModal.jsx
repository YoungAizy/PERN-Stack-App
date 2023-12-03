import React, { useState } from 'react';
import databinder from '../apis/databinder';


function RegistrationModal(props) {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [serverResponse, setServerResponse] = useState();

    if (!props.show) {
        return null;
    }

    const createAccount = async () => {
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
        <div className="showReg" style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
            <div style={{ backgroundColor: "coral" }} className="container mb-4 reg reg-form">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button className="btn close-btn" onClick={props.onClose}>Close</button>
                </div>
                <h2>Create a new Account</h2>
                <form action="" method="post">
                    <div >
                        <div className="form-floating form-margin">
                            <input type="text" className="form-control" id="username" placeholder="Username" value={name || ''} onChange={e => setName(e.target.value)} maxLength="50"/>
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating form-margin">
                            <input type="email" className="form-control" id="eMail" placeholder="name@example.com" value={email || ""} onChange={e => setEmail(e.target.value)} />
                            <label htmlFor="eMail">Email</label>
                        </div>
                        <div className="form-floating form-margin">
                            <input type="password" className="form-control" id="pass_word" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            <label htmlFor="pass_word">Password</label>
                        </div>
                        <button type="button" className="btn btn-secondary form-margin" onClick={createAccount}>REGISTER</button>
                        {serverResponse && !serverResponse.accessToken && <p style={{ fontWeight: "600" }}>{serverResponse}</p>}
                    </div>
                </form>
            </div>

        </div>
    )
}

export default RegistrationModal
