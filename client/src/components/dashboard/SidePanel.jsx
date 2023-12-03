import React from 'react';
import DefaultImage from '../../assets/default.jpg'

const imageStyle ={ marginLeft: 10}
const nameStyle ={marginTop:6}
const tabs = {display:'contents'}

// TODO: wrap component with useMemo to prevent re-rendering each time a different page is selected

const SidePanel = ({pages, onPageChanged})=>{


    return(
        <div className='col-3 bg-dark text-white'>
            <div className='p-3 d-flex flex-column justify-content-around' style={{maxHeight:"676px"}}>

            
            <div className='align-self-center'>
                <img src={DefaultImage} alt="hello" style={imageStyle} className='rounded-circle' width={150} height={150}/>
                <h4 className='pt-1' style={nameStyle}>Ayanda Marotya</h4>
            </div>
            <div style={tabs}>
                <button className='d-block btn btn-primary rounded-pill mt-4'
                onClick={()=> onPageChanged(pages[1])}><span><i class="fas fa-bell"></i></span> Notifications</button>
                <button className='d-block btn btn-primary rounded-pill  mt-4'
                onClick={()=> onPageChanged(pages[2])}><span><i class="fas fa-comment-alt"></i></span> Reviews</button>
                <button className='d-block btn btn-primary rounded-pill  mt-4' 
                onClick={()=>onPageChanged(pages[3]) }><span><i class="fas fa-folder"></i></span> My Listings</button>
                <button className='d-block btn btn-secondary rounded-pill  mt-4'
                onClick={()=> onPageChanged(pages[4])}><span><i class="fas fa-chart-line"></i></span> Analytics</button>
                <button className='d-block btn btn-primary rounded-pill  mt-4 mb-4'
                onClick={()=> onPageChanged(pages[0])}><span><i class="fas fa-user-alt"></i></span> Profile</button>
            </div>
            <button className='mt-5 btn btn-primary rounded-3 bg-dark'>Logout</button>
            </div>
        </div>
    )
}

export default SidePanel;