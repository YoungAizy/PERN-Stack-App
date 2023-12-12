import React from 'react';
import Header from '../components/Header';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import NotificationsPage from '../components/dashboard/reviewer/NotificationsPage';
import ReviewsPage from '../components/dashboard/reviewer/ReviewsPage';
import ProfilePage from '../components/dashboard/reviewer/ProfilePage';

const Home = () => {
    const history = useHistory();
    const {page} = useParams();


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