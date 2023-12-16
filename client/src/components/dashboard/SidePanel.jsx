import React from 'react';
import {useHistory} from 'react-router-dom'
import DefaultImage from '../../assets/default.jpg';
import { pageList } from '../../pages/DashboardPage';
import '../../styling/dashboard/sidePanel.css';
import authApi from '../../apis/auth';
import requestBody from '../../utils/requestBody';
import { userRequests } from '../../utils/requestTypes';

const imageStyle ={ marginLeft: 10}
const nameStyle ={marginTop:6}
const tabs = {display:'contents'}

// TODO: wrap component with useMemo to prevent re-rendering each time a different page is selected

const SidePanel = ({ onPageChanged, active, setActive })=>{
    const history = useHistory()

    const onTabChange = (tab,qs)=>{
        setActive(tab);
        history.push({
            search: `?window=${qs}`
          })
        onPageChanged(tab);
        return;
    }

    const homeClick = e=>{
        e.preventDefault();
        history.push('/');
    }

    const signOut = async e =>{
        e.preventDefault();

        const tokens = JSON.parse(localStorage.getItem("tokens"));
        const refreshToken = tokens.RefreshToken;

        const body = requestBody(userRequests.LOGOUT, {refreshToken});

        try {
            await authApi.signOut(body);
            localStorage.clear();
            history.push('/');
        } catch (error) {
            console.log("Error while signing out", error);
        }

    }


    return(
        <div className='col-3 bg-dark text-white'>
            <div className='p-3 pb-1 d-flex flex-column justify-content-around' style={{maxHeight:"676px"}}>
            
            <div className="m-3 mt-0 p-2 rounded-4 back-home" onClick={homeClick}>
                <span className='back-home-span' ><i className="fas fa-arrow-left"></i></span>
                HOME
            </div>
            <div className='align-self-center text-center'>
                <img src={DefaultImage} alt="hello" style={imageStyle} className='rounded-circle' width={120} height={120}/>
                <h4 className='pt-1' style={nameStyle}>Ayanda Marotya</h4>
            </div>
            <div id='sidepanel' style={tabs}>
                <button className={`d-block btn rounded-pill mt-3 ${active === pageList[1] ? 'btn-secondary' : 'btn-bg' }`}
                onClick={()=> onTabChange(pageList[1],'notifications')}><span><i className="fas fa-bell"></i></span> Notifications</button>
                <button className={`d-block btn rounded-pill mt-4 ${active === pageList[2] ? 'btn-secondary' : 'btn-bg' }`}
                onClick={()=> onTabChange(pageList[2],'reviews')}><span><i className="fas fa-comment-alt"></i></span> Reviews</button>
                <button className={`d-block btn rounded-pill mt-4 ${active === pageList[3] ? 'btn-secondary' : 'btn-bg' }`}
                onClick={()=>onTabChange(pageList[3],'listings') }><span><i className="fas fa-folder"></i></span> My Listings</button>
                <button className={`d-block btn rounded-pill mt-4 ${active === pageList[4] ? 'btn-secondary' : 'btn-bg' }`}
                onClick={()=> onTabChange(pageList[4], 'analytics')}><span><i className="fas fa-chart-line"></i></span> Analytics</button>
                <button className={`d-block btn rounded-pill mt-4 ${active === pageList[0] ? 'btn-secondary' : 'btn-bg' }`}
                onClick={()=> onTabChange(pageList[0],'profile')}><span><i className="fas fa-user-alt"></i></span> Profile</button>
            </div>
            <button className='mt-5 btn btn-primary rounded-3 bg-dark logout-btn' onClick={signOut}>Logout</button>
            </div>
        </div>
    )
}

export default SidePanel;