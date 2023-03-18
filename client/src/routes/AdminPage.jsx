import React from 'react';
import SidePanel from '../components/SidePanel';

const myStyle= {
    height: "100vh"
}

export default function AdminPage(props){

    return(
        <div>
            <div className="row" style={myStyle}>
                <SidePanel />
                <div className="content col">
                    CONTENT
                </div>
            </div>
        </div>
    )
}

