import React from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../../assets/bowl.jpg';
import SignInButtons from './SignInButtons';
import LoggedInBtns from './LoggedInBtns';
import DashboardBtn from './DashboardBtn';

const Header = ({ setShow }) => {

    const history = useHistory();
    // const isAuthenticated = localStorage.getItem("isAuthenticated");
    const userType = localStorage.getItem("user_type");

    return (
        <header className="home-header position-relative" style={{ backgroundImage: `url(${Background})` }}>
            <h1 className="font-weight-light display-1 text-center" style={{ color: "#ef8a64" }}>Restaurant Reviewer</h1>

            <>
                {userType ? (userType === "reviewer" ? <LoggedInBtns history={history} /> : <DashboardBtn history={history} />)
                    : <SignInButtons setShow={setShow} history={history} />}
            </>
        </header>
    )
}

export default Header;