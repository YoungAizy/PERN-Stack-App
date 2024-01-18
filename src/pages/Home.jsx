import React, { useEffect } from 'react';
import Header from '../components/home-header/Header';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import NotificationsPage from '../components/dashboard/reviewer/NotificationsPage';
import ReviewsPage from '../components/dashboard/reviewer/ReviewsPage';
import ProfilePage from '../components/dashboard/reviewer/ProfilePage';
import { useDispatch } from 'react-redux';
import { Redirect} from 'react-router-dom'
import userTypes from '../utils/UserTypes';
import { setActiveDashboardPage } from '../store/actions/reviewerDashboardActions';

const Home = () => {
    const userType = localStorage.getItem("user_type");
    const history = useHistory();
    const {page} = useParams();

    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(setActiveDashboardPage(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[page])
    
    if( userType !== userTypes.reviewer){
        return(
            <Redirect to="/"/>
        )
    }

    const checkPage = ()=>{
        switch (page) {
            case "notifications":
                return <NotificationsPage cardWrapperClasses={'col-8 mx-auto'} />

            case "reviews":
                return <ReviewsPage />

            case "profile":
                return <ProfilePage />
            default:
                history.push('/')
                break;
        }
    }

    return (
        <div>
            <Header />
            {/* <RestaurantList myRestaurants={true} /> */}
            {checkPage()}
            
        </div>
    )
}



export default Home;