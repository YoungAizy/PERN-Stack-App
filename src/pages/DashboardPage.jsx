import React, {useEffect, useState} from 'react';
import SidePanel from '../components/dashboard/SidePanel';
import Statistics from '../components/dashboard/windows/Statistics';
import Notifications from '../components/dashboard/Notifications';
import ProfileWindow from '../components/dashboard/windows/ProfileWindow';
import ReviewsWindow from '../components/dashboard/windows/ReviewsWindow';
import ListingsWindow from '../components/dashboard/windows/ListingsWindow';
import { useDispatch, useSelector } from 'react-redux';
import profileApi from '../apis/profile';
import { saveProfileDetails } from '../store/actions/profileActions';
import Header from '../components/Header';
import { saveUser } from '../store/actions/userActions';
import useQuery from '../hooks/useQuery';
import { Redirect} from 'react-router-dom'
import userTypes from '../utils/UserTypes';

const myStyle= {
    height: "100vh"
}

export const pageList ={
    0: "profile",
    1: "notifications",
    2: "reviews",
    3: "Listings",
    4: "stats"
}
const reverseMap ={
    notifications: 1,
    reviews: 2,
    listings: 3,
    analytics: 4,
    profile: 0
}

export default function DashboardPage(){
    const userType = localStorage.getItem("user_type");
    const [mobileScreen, setMobileScreen] = useState(false);
    const [page, setPage] = useState(pageList[1]);
    const [activeTab, setActiveTab] = useState();
    const query = useQuery();

    const profile = useSelector(state=> state.profile.profile);
    const dispatch = useDispatch();

    console.log("PROFILE:", profile);

    useEffect(()=>{
        console.log("window", reverseMap[query.get('window')]);
        setPage(pageList[reverseMap[query.get('window')]]);
        setActiveTab(pageList[reverseMap[query.get('window')]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        const screen = window.innerWidth;
        if (screen <= 760) {
            setMobileScreen(true);
        }
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> checkProfile() ,[])

    if( userType !== userTypes.lister){
        return(
            <Redirect to="/"/>
        )
    }

    async function checkProfile(){
        console.log("fetching...")
        if(mobileScreen) return;
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


    if (mobileScreen) {
        return (
            <div>
                <Header />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "65vh" }}>
                    <h4>This Page Is Not Available In Mobile.</h4>
                </div>
            </div>
        )
    }

    const onPageChanged =()=>{
        switch(page){
            case pageList[1]: return <Notifications/>;
            case pageList[2]: return <ReviewsWindow />
            case pageList[3]: return <ListingsWindow />
            case pageList[4]: return <Statistics/>
            case pageList[0]: return <ProfileWindow/>
            default: return <Notifications/>;
        }
    }

    return(
        <div>
            <div className="row g-0" style={myStyle}>
                <SidePanel onPageChanged={setPage} active={activeTab} setActive={setActiveTab} />
                <div className="content col p-2">
                    {onPageChanged()}
                </div>
            </div>
        </div>
    )
}
