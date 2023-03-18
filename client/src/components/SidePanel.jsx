import React from 'react';
import DefaultImage from '../assets/default.jpg'

const imageStyle ={ marginLeft: 10}
const nameStyle ={marginTop:6}
const tabs = {display:'contents'}

const SidePanel = (props)=>{


    return(
        <div className='col-4 p-3 d-flex flex-column justify-content-around bg-dark text-white'>
            <div className='align-self-center'>
                <img src={DefaultImage} alt="hello" style={imageStyle} className='rounded-circle' width={150} height={150}/>
                <h4 className='pt-1' style={nameStyle}>Ayanda Marotya</h4>
            </div>
            <div style={tabs}>
                <button className='d-block btn btn-primary rounded-pill'>Dashboard</button>
                <button className='d-block btn btn-secondary rounded-pill'>Statistics</button>
                <button className='d-block btn btn-primary rounded-pill'>Notifications</button>
                <button className='d-block btn btn-primary rounded-pill'>Profile</button>
            </div>
            <button className='mt-5 btn btn-primary rounded-3 bg-dark'>Logout</button>
        </div>
    )
}

export default SidePanel;