import React, { useState} from 'react';
import databinder from '../apis/databinder';


const LoginForm = ({ toggle }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loginResponse, setLoginResponse] = useState();


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
        <div id="login" style={{ backgroundColor: "coral", padding: ".5rem" }} className="container mb-4 show">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button style={{ marginRight: ".7rem" }} className="btn-close" onClick={toggle} aria-label="Close"></button>
            </div>
            <form action="" method="post">
                <div className="row">
                    <div className="col form-floating">
                        <input type="email" className="form-control" id="email" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="col form-floating">
                        <input type="password" className="form-control" id="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </div>
                    <div className="col">

                        <button type="button" className="btn btn-secondary" onClick={login}>LOGIN</button>
                    </div>
                </div>
            </form>
            {loginResponse && !loginResponse.accessToken && <p style={{ fontWeight: "600" }}>{loginResponse}</p>}
        </div>
    )
}

export default LoginForm

