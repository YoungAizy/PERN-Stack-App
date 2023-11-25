import React, {useState} from 'react';
import SidePanel from '../components/SidePanel';
import RestaurantsList from '../components/admin/RestaurantsList';
import Statistcs from '../components/admin/Statistics';
import Notifications from '../components/Notifications';
import ProfilePage from './ProfilePage';

const myStyle= {
    height: "100vh"
}

const pageList ={
    1: "dashboard",
    2: "stats",
    3: "notifications",
    4: "profile"
}

export default function AdminPage(props){
    const [page, setPage] = useState(pageList[1]);

    const onPageChanged =()=>{
        switch(page){
            case pageList[1]: return <RestaurantsList/>
            case pageList[2]: return <Statistcs/>
            case pageList[3]: return <Notifications/>
            case pageList[4]: return <ProfilePage/>
            default: return "hello";
        }
    }

    return(
        <div>
            <div className="row g-0" style={myStyle}>
                <SidePanel pages={pageList} onPageChanged={setPage}/>
                <div className="content col p-2">
                    {onPageChanged()}
                </div>
            </div>
        </div>
    )
}

