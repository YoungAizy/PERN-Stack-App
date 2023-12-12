import React from 'react';
import DefaultImage from '../../assets/default.jpg';
import '../../styling/dashboard/notification.css';

const _Notification = ({wrapperClasses})=>{
    
    
    return(
        <div className={wrapperClasses}>
            <div className="card">
                <div className="row g-0">
                    <div className="col-2 align-self-center"> <img className="img-fluid rounded-start notification-image"   src={DefaultImage} alt="" /></div>
                    <div className="col">
                        <div className="card-body">
                            <h4 className='card-title mb-0'>Restaurant Tile</h4>
                            <span>(Cape Town, 24 Bird Street)</span>
                            <p className="card-text mt-2">Josh gave you 2.5 stars rating</p>
                        </div>
                    </div>
                    <div className="col-2 align-self-center">Mark as seen</div>
                </div>
            </div>
        </div>
    )
}

export default _Notification;