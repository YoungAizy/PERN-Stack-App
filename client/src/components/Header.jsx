import React from 'react';
import { useHistory } from 'react-router-dom';
import Background from '../assets/bowl.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDashboardPage } from '../store/actions/reviewerDashboardActions';


const Header = ({ setShow }) => {

    const history = useHistory();
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    // const isAuthenticated = true;

    return (
        <header className="home-header position-relative" style={{ backgroundImage: `url(${Background})` }}>
            <h1 className="font-weight-light display-1 text-center" style={{ color: "#ef8a64" }}>Restaurant Reviewer</h1>

            <>
                {isAuthenticated ? <LoggedInBtns history={history} />
                    : <SignInButtons setShow={setShow} history={history} />}
            </>
        </header>
    )
}

const LoggedInBtns = ({ history}) => {
    const dispatch = useDispatch();
    const page = useSelector(state=> state.reviewerPages.activePage);
    console.log(page)

    const onProfileClick = ()=>{
        dispatch(setActiveDashboardPage("profile"));
        history.push('/dashboard/profile')
    }
    const onNotificationsClick = ()=>{
        dispatch(setActiveDashboardPage("notifications"));
        history.push('/dashboard/notifications')
    }
    const onReviewsClick = ()=>{
        dispatch(setActiveDashboardPage("reviews"));
        history.push('/dashboard/reviews')
    }

    const onLogout = ()=>{
        
        localStorage.clear();
        history.push('/');
    }
    
    return (
        <>
            <nav className='position-absolute start-0 ms-3 z-3 top-0 mt-4'><button className='btn' style={{backgroundColor:"crimson", color:"white"}} onClick={onLogout} >Logout</button></nav>
            <div className='position-absolute end-0 top-0 bottom-0 z-3 d-flex flex-column justify-content-around' style={{marginTop:20, marginBottom:20}}>
                {page === "notifications" ? <HomeNavBtn history={history} /> :
                    <nav className="signin bg-primary"><button onClick={onNotificationsClick} > <i className="fas fa-bell"></i> Notifications</button></nav>}
                {page === "reviews" ? <HomeNavBtn history={history} /> :
                    <nav className="signin bg-primary"><button onClick={onReviewsClick} > <i className="fas fa-comments me-1"></i> Reviews</button></nav>}
                {page === "profile" ?  <HomeNavBtn history={history} /> : 
                    <nav className="signin bg-primary"><button onClick={onProfileClick }><i className="fas fa-user me-1"></i> Profile</button></nav>}
            </div>
        </>
    )
}

const SignInButtons = ({ setShow, history}) => {
    return (
        <div style={{ float: "right" }}>
            <nav className="signin bg-primary"><button onClick={() => history.push('/signup')} >Signup</button></nav>|
            <nav className="signin bg-primary"><button onClick={() => setShow(true)}>Login</button></nav>
        </div>
    )
}

const HomeNavBtn = ({history})=>{
    const dispatch = useDispatch()

    const homeClick= ()=>{
        dispatch(setActiveDashboardPage(""))
        history.push('/')
    }

    return(
        <nav className="signin bg-primary"><button onClick={homeClick } ><i className="fas fa-home me-1"></i> Home</button></nav> 
    )
}

export default Header;