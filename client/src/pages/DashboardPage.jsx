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

const myStyle= {
    height: "100vh"
}

export const pageList ={
    0: "Profile",
    1: "notifications",
    2: "reviews",
    3: "Listings",
    4: "stats"
}

export default function DashboardPage(){
    const [mobileScreen, setMobileScreen] = useState(false);
    const [page, setPage] = useState(pageList[1]);
    const [activeTab, setActiveTab] = useState("notifications");

    const profile = useSelector(state=> state.profile.profile);
    const dispatch = useDispatch();

    console.log("PROFILE:", profile);


    useEffect(() => {
        const screen = window.innerWidth;
        if (screen <= 760) {
            setMobileScreen(true);
        }
    }, []);



    async function checkProfile(){
        if(mobileScreen) return;
        if(!profile.username){
            //we want to fetch profile from server
            try {
                const {data} = await profileApi.fetch();
                console.log("Fetch results", data);
                dispatch(saveProfileDetails({data}));
            } catch (error) {
                console.log("Fetch Error:",error);
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=> checkProfile() ,[])

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

