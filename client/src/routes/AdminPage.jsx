import React from 'react';
import SidePanel from '../components/SidePanel';
import RestaurantsList from '../components/admin/RestaurantsList';

const myStyle= {
    height: "100vh"
}

export default function AdminPage(props){

    return(
        <div>
            <div className="row g-0" style={myStyle}>
                <SidePanel />
                <div className="content col p-2">
                    <RestaurantsList/>
                </div>
            </div>
        </div>
    )
}

