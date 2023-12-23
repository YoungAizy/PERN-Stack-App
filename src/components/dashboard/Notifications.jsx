import React from 'react';
import NotificationComp from './Notification';

const Notifications = ({wrapperClasses})=>{
    
    
    return(
        <div className='m-3'>
            <h3 className='text-center mb-4'>Notifications</h3>
            <NotificationComp wrapperClasses={wrapperClasses}/>
        </div>
    )
}

export default Notifications;