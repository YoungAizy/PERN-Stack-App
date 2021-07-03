import React from 'react'

const UploadNotification = (isSuccessful) => {
    return (
        <div id='popup-notification' className='notification-container'>
           {isSuccessful ? <div className='notification'>
                <p style={{fontSize:"1.3rem", fontWeight:"500", margin:"8px 0"}}>Successfuly Uploaded!</p>
            </div> :<div className='notification-failed'>
                <p style={{fontSize:"1.3rem", fontWeight:"500", margin:"8px 0"}}>Failed to Upload!</p>
            </div> }
        </div>
    )
}

export default UploadNotification
