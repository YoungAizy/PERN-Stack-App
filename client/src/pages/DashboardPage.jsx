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


    useEffect(() => {
        const screen = window.innerWidth;
        if (screen <= 760) {
            setMobileScreen(true);
        }
    }, []);

    const token = "eyJraWQiOiJuNXFYUWF3K04rbWN6Z3dyelg5c0Q0SmF0djFKZk5yaENJUzNZMnBNT1g4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYzJkMGJiOS1jODdjLTRhNTUtOTM1OC1jMDMzY2FjZDRhMmEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl9haHMyVjNJN20iLCJjbGllbnRfaWQiOiIzb2piZ2o5MzllaTVmbDZhbnIxNW5lNmJ0aSIsIm9yaWdpbl9qdGkiOiJiNTE3MDk5Mi01NmNiLTQwM2UtODNmMC1kZmZhMzA2ZmZiZTciLCJldmVudF9pZCI6ImU4NmY4YTIxLWUwMjYtNDAzMC05OGVhLTg3OTgxNjk4OWE5YiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MDIyODkzNDAsImV4cCI6MTcwMjM3NTc0MCwiaWF0IjoxNzAyMjg5MzQwLCJqdGkiOiI4M2RjZmQ5MS03NGZlLTQ1MjAtYjBjNi04OTdkNmQ4MTVjMzUiLCJ1c2VybmFtZSI6ImZjMmQwYmI5LWM4N2MtNGE1NS05MzU4LWMwMzNjYWNkNGEyYSJ9.LKnJFL64FtjWcbIRiVwQpv5Y43K0qC36yFlBHHKdPx2oTaXBZKjuubjKAyu7iwjSDNsXfuelPvcweUO2ElNKH1xu1Z_DtyyUX4uKJ7aQMpaeI4Js19RMN2_KqV50vYqW7TxpPJf55G5Bz8uZrhZ1O7Q3JQ-WTXxcsy8XgXcE_MIXlz0cALo1uPJgYfQ2KXPwODEHC306_wa5kamNK-akeKIfPJe11t7MVt6W_k1EmxAwefT-eRWTj9ZkVatqx7w6Al9MRrsW9vgBG8YmItci74GtzLI6-Ktn_RGzAnRIsooSURAINq8yl8RDF86wlqo-fCaGYxVqC_Y33Mn0Yi9gMQ";

    async function checkProfile(){
        if(mobileScreen) return;
        if(!profile.username){
            //we want to fetch profile from server
            try {
                const {data} = await profileApi.fetch(token);
                console.log("Fetch results", data);
                dispatch(saveProfileDetails(data));
            } catch (error) {
                console.log("Fetch Error:",error);
            }
        }
    }

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

