import React from 'react';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import HomeNavBtn from './HomeNavBtn';

const LoggedInBtns = ({ history}) => {
    const page = useSelector(state=> state.reviewerPages.activePage);
    console.log(page)

    const onProfileClick = ()=>{
        history.push('/home/profile')
    }
    const onNotificationsClick = ()=>{
        history.push('/home/notifications')
    }
    const onReviewsClick = ()=>{
        history.push('/home/reviews')
    }
    
    return (
        <>
            <LogoutBtn />
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

export default LoggedInBtns