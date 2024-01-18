import React from 'react';
import LogoutBtn from './LogoutBtn';

const DashboardBtn = ({history})=>{

    const gotToManageDashboard = ()=>{
        history.push({
            pathname:'/dashboard/manage',
            search: '?window=notifications'
        })
    }

    return(
        <>
            <LogoutBtn />
            <div style={{ float: "right" }}>
                <nav className="me-2 nav-btn bg-dark" ><button className="btn" style={{color:"inherit"}} onClick={gotToManageDashboard } ><i className="fas fa-home me-1"></i> Dashboard</button></nav> 
            </div>
        </>
    )
}

export default DashboardBtn