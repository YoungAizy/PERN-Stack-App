import React from 'react'

const Avatar = ({imgSrc, initials, bg_color}) => {

  return (
    <div className='rounded' style={{backgroundColor:`${bg_color}`}}>
        {!imgSrc ? <span>{initials}</span> : <img src={imgSrc} alt='Avatar' /> }
    </div>
  )
}

export default Avatar;