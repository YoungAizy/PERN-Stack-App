import React from 'react'

const SigninOverlay = () => {
  return (
    <div className='position-fixed z-3 top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center' 
        style={{backgroundColor:"#f9f1e7f2"}}>
        <div className=''>
            <h2>Signing You In ...</h2>

        </div>
    </div>
  )
}

export default SigninOverlay