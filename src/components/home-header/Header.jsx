import React from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../../assets/bowl.jpg';
// Dynamic import
const SignInButtons = React.lazy(()=> import('./SignInButtons'));
const LoggedInBtns = React.lazy(()=>('./LoggedInBtns'));
const DashboardBtn = React.lazy(()=>('./DashboardBtn'));

const Header = ({ setShow }) => {

    const history = useHistory();
    // const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("user_type");

    return (
        <header className="home-header position-relative" style={{ backgroundImage: `url(${Background})` }}>
            <h1 className="font-weight-light display-1 text-center title " style={{ color: "#ef8a64" }}>Feed</h1>

            <React.Suspense fallback={<></>} >
                {userType ? (userType === "reviewer" ? <LoggedInBtns history={history} /> : <DashboardBtn history={history} />)
                    : <SignInButtons setShow={setShow} history={history} />}
            </React.Suspense>
        </header>
    )
}

export default Header;