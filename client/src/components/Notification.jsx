import React from 'react';
import DefaultImage from '../assets/default.jpg'

const _Notification = (props)=>{
    
    
    return(
        <div>
            <div className="card">
                <div className="row g-0">
                    <div className="col-2 align-self-center"> <img className="img-fluid rounded-start"   src={DefaultImage} alt="" /></div>
                    <div className="col">
                        <div className="card-body">
                            <h4 className='card-title'>Restaurant Tile</h4>
                            <span>Loacation: City</span>
                            <p className="card-text">Josh gave you 2.5 stars rating</p>
                        </div>
                    </div>
                    <div className="col-2 align-self-center">Mark as seen</div>
                </div>
            </div>
        </div>
    )
}

export default _Notification;