import React, {useState} from 'react';
import SidePanel from '../components/dashboard/SidePanel';
import Statistics from '../components/dashboard/windows/Statistics';
import Notifications from '../components/dashboard/Notifications';
import ProfilePage from '../components/dashboard/windows/ProfileWindow';
import ReviewsWindow from '../components/dashboard/windows/ReviewsWindow';
import ListingsWindow from '../components/dashboard/windows/ListingsWindow';

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

export default function DashboardPage(props){
    const [page, setPage] = useState(pageList[1]);
    const [activeTab, setActiveTab] = useState("notifications");

    const onPageChanged =()=>{
        switch(page){
            case pageList[1]: return <Notifications/>;
            case pageList[2]: return <ReviewsWindow />
            case pageList[3]: return <ListingsWindow />
            case pageList[4]: return <Statistics/>
            case pageList[0]: return <ProfilePage/>
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

