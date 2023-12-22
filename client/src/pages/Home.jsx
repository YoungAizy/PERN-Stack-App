import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import NotificationsPage from '../components/dashboard/reviewer/NotificationsPage';
import ReviewsPage from '../components/dashboard/reviewer/ReviewsPage';
import ProfilePage from '../components/dashboard/reviewer/ProfilePage';
import { useDispatch, useSelector } from 'react-redux';
import { saveProfileDetails } from '../store/actions/profileActions';
import { saveUser } from '../store/actions/userActions';
import profileApi from '../apis/profile';
import { Redirect} from 'react-router-dom'
import userTypes from '../utils/UserTypes';

const Home = () => {
    const userType = localStorage.getItem("user_type");
    const history = useHistory();
    const {page} = useParams();

    
    const profile = useSelector(state=> state.profile.profile);
    const dispatch = useDispatch();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> checkProfile() ,[]);
    
    if( userType !== userTypes.reviewer){
        return(
            <Redirect to="/"/>
        )
    }
    async function checkProfile(){
        if(!profile.username){
            //we want to fetch profile from server
            try {
                const {data} = await profileApi.fetch();
                console.log("Fetch results", data);
                dispatch(saveProfileDetails({data:data.profile}));
                dispatch(saveUser({data:data.user}));
            } catch (error) {
                console.log("Fetch Error:",error);
            }
        }
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