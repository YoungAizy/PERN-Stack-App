import React, {useState} from 'react'

const Avatar = ({ initials, bg_color, imgId,setPictureData}) => {
  const [picture, setPicture] = useState(null);

  const getPictureData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPicture(e.target.result);
      setPictureData(file);
    }
    reader.readAsDataURL(file);
}

  return (
    <div className="mb-4 form-margin">
      <input className="form-control" type="file" id="formImg" accept="image/*"
          onChange={e => getPictureData(e.target.files[0])} style={{ display: 'none' }} />
      <label htmlFor="formImg" style={{display:"inline"}} >
        <div className='d-flex justify-content-center'>  
          <div className='d-flex justify-content-center align-items-center rounded-circle' 
          style={{backgroundColor:`${bg_color}`, width:"150px", height:150, 
          textAlign:"center", color:"white", fontWeight:"bold", letterSpacing:1}}>
            {!picture ? <span style={{fontSize:"xxx-large"}}>{initials}</span> : <img id={imgId} src={picture} className='rounded-circle' style={imgStyle} alt='Avatar' /> }
          </div>
        </div>
        </label>
  </div>
  )
}

const imgStyle ={
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}

export default Avatar;